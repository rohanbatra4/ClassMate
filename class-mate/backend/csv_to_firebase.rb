require "google/cloud/firestore"
require "csv"

# Initialize Firestore client
project_id = "classmate-c1709"
credential_file = "/Users/rohanbatra/Desktop/CS4365/classmate-c1709-firebase-adminsdk-vnn46-924de10054.json"
db = Google::Cloud::Firestore.new(
  project_id: project_id,
  credentials: credential_file
)
csv_file_path = "/Users/rohanbatra/Desktop/CS4365/CourseList.csv"

# Parse the CSV file
csv_data = CSV.read(csv_file_path)
collection = "CollegeCourseList"
document = "GT"
csv_data.each do |row|
  key = row[1]  # Get the key from the first column
  value1 = row[0]  # Get the first value from the second column
  value2 = row[2]  # Get the second value from the third column
  if key != nil and key != "CRN" and key.scan(/\D/).empty? # add key with two values
    # store all key-value pairs in one document
    db.collection(collection).doc(document).set({key => [value1, value2]}, merge: true)
    # try except block to handle errors
  end 
end

