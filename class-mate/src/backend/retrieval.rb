require 'sinatra'
require 'sinatra/cross_origin'
require 'json'
require "google/cloud/firestore"

# Initialize Firestore client
project_id = "classmate-2bc70"
credential_file = "/Users/rohanbatra/Desktop/CS4365/classmate-2bc70-firebase-adminsdk-v075n-fad07d3573.json"
db = Google::Cloud::Firestore.new(
  project_id: project_id,
  credentials: credential_file
)
collection = "UserClasses"
# set blank dictionary
dictionary = {}
pushEmail = ""

configure do
    enable :cross_origin
  end
  
  before do
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    response.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
  end
  
  options '*' do
    200
  end
  

  post '/name' do
    puts "Entered the POST block"
    body = request.body.read
    puts body
    dictionary = JSON.parse(body)
    pushEmail = dictionary["emailId"]
    for key in dictionary.keys
        if (key != "emailId")
          db.collection(collection).doc("emails").set({pushEmail => dictionary[key]}, merge: true)
        end
    end
  end

