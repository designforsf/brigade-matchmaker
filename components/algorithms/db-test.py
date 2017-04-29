'''

    @author: jpitts

    Requirements:
        - pymongo needs to be installed
        - mongodb needs to be running
        - brigade-matchmaker web needs to be running
            (populates the users table in the brigade-matchmaker collection)

    For installation instructions:
    http://api.mongodb.com/python/current/installation.html

    For the API:
    http://api.mongodb.com/python/current/api/pymongo/collection.html

    Install dependencies:
        python -m pip install pymongo

    Usage:
        python ./db-test.py

'''

import time
import pymongo
from pymongo import MongoClient

collection_name = 'brigade-matchmaker'


time.sleep(1)
print
print "IMPORTANT NOTE: to load projects, first run the web app!"
time.sleep(3)

print
print "Connect to " + collection_name
'''
see if the default env variable is used now....
client = MongoClient('localhost', 27017)
'''

db = client[collection_name]

print
print 'db.projects.count() = ' + str(db.projects.count())

print
print 'db.projects.find() = '

for project in db.projects.find({}):
    print project['name']
    for needType in ["interestsNeeded","skillsNeeded","rolesNeeded"]:
        print " " + needType + ":"
        for need in project['matchingConfig'][needType]:
            print " + " + need
    print
