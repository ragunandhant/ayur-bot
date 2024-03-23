import streamlit as st
import langchain
import transformers


import textwrap

def wrap_text_preserve_newlines(text, width=110):
    # Split the input text into lines based on newline characters
    lines = text.split('\n')

    # Wrap each line individually
    wrapped_lines = [textwrap.fill(line, width=width) for line in lines]

    # Join the wrapped lines back together using newline characters
    wrapped_text = '\n'.join(wrapped_lines)

    return wrapped_text
import os
os.environ["HUGGINGFACEHUB_API_TOKEN"] = "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"
# Set the title and page icon
# Embeddings
from langchain.embeddings import HuggingFaceEmbeddings

embeddings = HuggingFaceEmbeddings()
from langchain.vectorstores import FAISS
model = FAISS.load_local('model',embeddings)

st.set_page_config(page_title="Greet the User", page_icon="👋")

# Create a Streamlit app
st.title('Welcome to Greet the User')

# Add an input field for the user to enter their name
user_name = st.text_input('Enter your Prompt:')

# Add a button to trigger the greeting
if st.button('Say Hi'):
    if user_name:
        res = model.similarity_search(user_name)

        st.write(f'Hi, {wrap_text_preserve_newlines(str(res[0].page_content))}! 👋')
    else:
        st.write('Hi there! 👋')
