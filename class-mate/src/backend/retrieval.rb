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
dictionary1 = {}
pushEmail = ""
exist = false
verification = false

configure do
    enable :cross_origin
    dictionary1 = {}
  end
  
  before do
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    response.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
  end
  
  options '*' do
    200
  end
  
  post '/verify' do
    puts "Entered the Verify POST block"
    body = request.body.read
    puts body
    dictionary1 = JSON.parse(body)
    verification = true
  end

get '/receive' do
  puts "Entered the GET block"
  while verification == false do
    sleep(1)
  end
  result = []
  check = 0
  count = 1
  exist = false
  if !dictionary1["crns"].nil?
    for value in dictionary1["crns"]
      if value.nil?
        next
      end
      while count < 8 do
        if (db.collection("CollegeCourseList").doc("GT" + count.to_s).get[value] == nil)
          check += 0
        else
          check += 1
          puts db.collection("CollegeCourseList").doc("GT" + count.to_s).get[value]
          result.push(db.collection("CollegeCourseList").doc("GT" + count.to_s).get[value])
          break
        end
        count += 1
      end
    end
  end
  exist = (check == dictionary1["crns"].length)
  puts exist

  content_type :json
  { result: result, exist: exist }.to_json
end


  post '/name' do
    puts "Entered the User POST block"
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



