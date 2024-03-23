import React, { useState } from "react";
import "./Chatbot.css"
import logo from '../../assets/chatbot.png'
import send from'../../assets/send-message.png'
import ChatMessages from "../chatMessages/ChatMessages";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import {help_icon} from '../../assets/help_icon.png'

ChartJS.register(ArcElement, Tooltip, Legend);



function Chatbot(){
    const [vata,setvata]=useState(0)
    const [pitta,setPitta]=useState(0)
    const [kapha,setKhapa]=useState(0)
    const [result,setResult]=useState('')
    const [qcount,setQcount]=useState(0)
    ChartJS.defaults.font.size=30;
    const options = {
        legend: {
          display: false, 
        },
        plugins: {
          legend: {
            display: true,
            position: "right", 
            align: "center", 
            labels: {
              boxWidth: 15, 
              fontSize: 14, 
              padding: 70, 
            },
          },
        },
      };
    const data = {
        labels: ['vata', 'Pitta', 'Khapa'],
        datasets: [
          {
            label: 'Prakriti',
            data: [vata, pitta, kapha],
            backgroundColor: [
                '#ffaa94',
              '#58cafe',
              '#91e6aa',
            ],
            borderColor: [
                '#ffaa94',
                '#58cafe',
                '#91e6aa',
            ],
            borderWidth: 1,
          },
        ],
      };
    const [display,setDisplay]=useState(false)

    const ques = [["BODY FRAME "," A) Thin, bony and small framed. Hardly gain weight.","B) Medium built. Can gain or lose weight easily.","C)  Large built. Gain weight easily but difficult to lose."],
["WALK & TALK","A) Fast walk and talk","B) Moderate and determined walk","C) Slow and steady walk"],
["WEATHER REACTION","A)  Enjoy warm climate but feel uncomfortable in cool climate","B) Enjoy cool weather and dislike warm climate","C) Comfortable for most of the year  but prefer summer and spring.Dont't like damp climate."],
["SWEATING","A) Sweat little but not much. Have minimal body order.","B) Sweat a lot. Have medium body odour.","C) Sweat moderately but swear a lot when working hard. Have strong body odour."],
["APPETITE","A) Irregular.Sometimes I feel hungry ,Sometimes I don't.","B) Strong and sharp.Always feel hungry.","C) Decent appetite.Have tendency to eat for comfort and taste."],
["SKIN ","A) Normal to dry, rough, thin and cool.Skin issues like dryness, dullness and wrinkly.","B) Normal to oliy, soft, reddish, sensitive and warm. Skin issues like inflammation.","C) Normal to oily, soft, thick and cool. Skin issues like excessive oily, itching, fungal infections."],
["HAIR ","A) Rough, dry and wavy. I get split ends easily.","B) Normal, straight, thin and brownish.","C) Thick, curly and oily.Hair colour tends to be on darker side"],
["LIPS AND TEETH","A) Have thin lips that tend to get dry.Teeth-uneven,teeth requiires constant attention.","B) Medium sized soft lips.Upper lip slightly darker than lower lip.Teeth tend to suffer from cavity.","C) Large and smooth lips.Teeth are well formed and aligned and require less care in general."],
["EYES","A) Small in size. Feel dry and sleepy eyes often. I blink a lot.","B) Medium in size. I often get reddish eyes.","C) Big and attractive. I have thick eye lashes."],
["GENERAL SIGNS","A) Cracking sound in joints. Small forehead. Nails cracks easily.","B) Black moles on body. Medium forehead. Nails are pink and soft.","C) Disproportionate body like heavy thighs, hips etc. Large forehead. Nails are wide and whitish."],
["MEMORY","A) Quick to learn but quick to forget. Short term memory is good.","B) Average speed of learning. But once learnt, never forgets.","C) Slows to learn but remembers for a long time. Long term memory is good."],
["MIND","A) Minds tends to get restless easily.","B) Mind gets impatient or aggressive easily.","C) Mind remain cool and calm. Mostly, unruffled."],
["MIND ON ACTIONS","A) Over thinking.","B) Quick implementation.","C) Lazy implementation. Has a tendency to procrastinate."],
["SLEEP QUALITY","A) Light and disturbed sleep. I wake up easily in the morning.","B) Moderate but regular. I can go back to sleep easily.","C) Deep and heavy. I can’t easily wake up in the morning."],
["EMOTIONAL NATURE","A) I worry a lot. Often feel nervous and anxious.","B) I often get irritable, angry and impatient.","C) Loving and caring. It takes a lot to make me angry."]]

    const [messages, setMessages] = useState([
        {
            message: ["Welcome! Your name, please? Let's uncover your Prakriti!"]
        }
    ]) ;
    const [text,setText]=useState('')

    const onSend = () =>{
        if (text!=''){
            if(display==false){
                let list = [...messages,{message:[text],user:true}]
                if (list.length == 2){
                    list=[
                        ...list,
                        {
                            message: [`Namaste, ${text}!💚 I'm here to assist you in discovering your Prakriti`]
                        },
                        {
                            message: ['Please navigate this journey by selecting A/B/C for your Prakriti assessment']
                        }
                    ]
                }
                else{
                    if (qcount<15){
                        list=[
                            ...list,
                            {
                                message:ques[qcount]
                            }
                        ]
                    }
                    else{
                        list=[...list,
                            {
                                message:["Thank you"]
                            }]
                        
                        setDisplay(true)
                    }
                    if (text=='A'|| text=='a'){
                        setvata(vata+1)
                    }
                    else if(text=='B'||text=='b'){
                        setPitta(pitta+1)
                    }
                    else if(text=='C'||text=='c'){
                        setKhapa(kapha+1)
                    }
                    setQcount(qcount+1)
                }
                setMessages(list)
                setText("")
                calculate()
                setTimeout(()=>{
                    document.querySelector('#sendBtn').scrollIntoView({ behavior: "smooth" })
                },1)
        }
       
    }
    }
    const calculate=()=>{
        if(vata>kapha && vata>pitta){
            setResult('Vata')
        }
        else if(pitta>vata && pitta>kapha){
            setResult('Pitta')
        }
        else if(kapha>vata && kapha>pitta){
            setResult('Kapha')
        }
    }
      
    return (
        <>
            <div className="outerContainer">
                <img src={help_icon} alt="help_icon" />
                <div className="headContainer">
                    <img src={logo} height="100" width="100" />
                    <h1 id="head">AyurBot</h1>
                </div>
                <div className="msgContainer">
                    {
                        messages.length>0 && messages.map((data)=> <ChatMessages {...data} />)
                    }
                    <div className="inputArea">
                        <input type="text" id="inpBox" value={text} onChange={(e)=> setText(e.target.value)} />
                        <img src={send} alt="" onClick={onSend} id="sendBtn"/>
                    </div>
                </div>
            </div>
            <div>
            {
                display ? (
                    <>
                    <div className="result" id="res" >
                        <div className="head">
                            <h1>PRAKRITI PERCENTAGE</h1>
                        </div>
                        
                        <div className="chart">
                            <Doughnut  data={data} options={options} />
                        </div>
                        <div className="dosha">
                            <p >Dominant dosha - <span style={{color: result=='Vata' ? '#45995e': result=='Pitta'?'#3999c5':'#438858'}}>{result}</span></p>
                        </div>
                    </div>
                    </>
                    
                ):(
                    <></>
                )
            }
            </div>
            
        </>
    )
}

export default Chatbot;