import openai
from flask import Flask, render_template, request , jsonify
import json
openai.api_key = "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"


app = Flask(__name__)
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/mylist', methods=['POST'])
def mylist():
    global data
    data = request.get_json()
    print(data)
    return 'Data received'
@app.route('/submit_form_time', methods=['POST'])
def submit_form_time():
    time = request.form['wo_time']
    global global_time
    global_time = time
    # Process the input data as needed
    print(time)
    return jsonify({'message': 'Form submission successful!'})

@app.route('/submit-form-height-weight', methods=['POST'])
def submit_form_wh():
    height = request.form['height']
    weight = request.form['weight']
    # Process the input data as needed
    response = openai.Completion.create(
      model="text-davinci-003",
      prompt=f"\nexample user:Imagine you are my personal coach.Make me a workout plan for a day.Take in consideration that my fitness level is beginer, i am 175cm height and 57kg weight,my fitness goal is to gain muscles.I want to focus on fullbody and train for 15 minutes\n\nexample AI:Warm up: \n- Jogging on the spot (2 minutes)\n- Arm circles (1 minute)\n- Squats (1 minute)\n\nWorkout: \n- Burpees (45 seconds) \n- Pike Pushups (45 seconds) \n- 90 Degree Toe Taps (45 seconds) \n- Tricep Extensions (45 seconds) \n- Single Leg Pushups (22 seconds each leg) \n- Bench Dips (45 seconds) \n- Body Rows (45 seconds) \n- Tucked Reverse Leg Extension (45 seconds) \n- Side Lunges (22 seconds each side) \n- Explosive Lunges (22 seconds each side) \n- Squats (45 seconds) \n- High Plank to Low Plank (22 seconds each) \n- In and Outs (45 seconds) \n- Plank Hold (45 seconds) \n- Russian Twists (45 seconds) \n\nRest: \n- Rest for 20 seconds between each exercise \n\nCool down: \n- Stretching (2 minutes) \n\nEnjoy your workout!or each exercises and 20 seconds of rest between each exercise\n\nuser:Imagine you are my personal coach.Make me a workout plan for a {data[0]} without equipment.Take in consideration that my fitness level is {data[1]}, i am {height} height and {weight}kg weight,my fitness goal is to {data[2]}.I want to focus on {data[3]} and train for {global_time} minutes.\n\nAI:\n",
      temperature=0.7,
      max_tokens=500,
      top_p=1,
      frequency_penalty=0,
      presence_penalty=0
    )
    res = response.choices[0].text

    print(weight)
    return res

if __name__ == '__main__':
    app.run(debug=True)