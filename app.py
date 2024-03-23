from flask import Flask, request, jsonify

app = Flask(__name__)

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


@app.route('/')
def hello():
    return 'Hello, World!'


@app.route('/process_text', methods=['POST'])
def process_text():
    try:
        # Get the JSON data from the request
        data = request.get_json()

        # Check if the 'text' field exists in the JSON data
        if 'question' in data:
            user_text = data['question']
            res = model.max_marginal_relevance_search(user_text)
            user_text = wrap_text_preserve_newlines(str(res[0].page_content))
            # You can perform any processing or computation with the user's input here
            # For demonstration purposes, we'll just return the input text
            response_data = {'data': f'{user_text}'}
            
            return jsonify(response_data), 200
        else:
            return jsonify({'error': 'Missing field "text" in the request JSON'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
