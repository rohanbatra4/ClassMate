require 'execjs'

# get value of crn array from confirm.jsx file
crn_array = ExecJS.eval(File.read('./src/modules/Enter.jsx'))