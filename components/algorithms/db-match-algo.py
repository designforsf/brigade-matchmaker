import sys
import pprint
pp = pprint.PrettyPrinter();
import pymongo
from pymongo import MongoClient

#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Created on Wed Oct 12 20:30:54 2016

@author: ryanlim, jpitts

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

@usage:
    python ./db-match-algo.py javascript,python housing developer,presenter
    python ./db-match-algo.py data-science homelessness developer
    python ./db-match-algo.py ruby null developer,learner
    python ./db-match-algo.py null null leader
    python ./db-match-algo.py javascript null null
"""

# database configuration
collection_name = 'brigade-matchmaker'
client = MongoClient('localhost', 27017)
db = client[collection_name]

""" NOTE: projects_list below is for understanding the data structure
            used in the algo (soon to reflect what is in the database)
projects_list = [
    {
        'id':'ux-research',
        'name':'UX Research',
        'interests_needed':['all','community-organizer'],
        'skills_needed':['python','javascript','html'],
        'goals_needed':['developer','helper']
    },
    {
        'id':'data-sciences',
        'name':'Data Sciences',
        'interests_needed':['all'],
        'skills_needed':['python'],
        'goals_needed':['developer']
    }
]
"""

# load the projects list from the database
projects_list = []
projects_count = 0
for project in db.projects.find({}):
    #print 'load ' + project['name']
    #print project['_id']

    # interests
    project['interests_needed'] = []
    for need in project['matchingConfig']['interestsNeeded']:
        project['interests_needed'].append(need)

    # skills
    project['skills_needed'] = []
    for need in project['matchingConfig']['skillsNeeded']:
        project['skills_needed'].append(need)

    # goals
    project['goals_needed'] = []
    for need in project['matchingConfig']['goalsNeeded']:
        project['goals_needed'].append(need)

    projects_list.append(project)
    projects_count += 1

# END loading projects list

def matchmaking (skills_list, interests_list, goals_list):

    """
    print 'matchmaking()'
    print 'skills='
    pp.pprint(skills_list)
    print 'interests='
    pp.pprint(interests_list)
    print 'goals='
    pp.pprint(goals_list)
    """

    #iterate over the projects
    for project in projects_list:

        # factors to prioritize skills
        skills_factor = 2
        interests_factor = 1
        goals_factor = 1

        project['user_score'] = 0

        # in this project hold the totals for this user's
        #   skills, interests, and goals
        project['skills_total'] = 0
        project['skills_matched'] = []
        project['interests_total'] = 0
        project['interests_matched'] = []
        project['goals_total'] = 0
        project['goals_matched'] = []

        '''
        iterate over the skills_list and get the corresponding
        values for each skill and the total value from the project
        '''
        if len(skills_list) > 0:
            for skill in skills_list:
                if skill in project['skills_needed']:
                    project['skills_total'] += 1
                    project['skills_matched'].append(skill)

        '''
        iterate over the interests_list and get the corresponding
        values for each interest and the total value from the project
        '''
        if len(interests_list) > 0:
            for interest in interests_list:
                if interest in project['interests_needed']:
                    project['interests_total'] += 1
                    project['interests_matched'].append(interest)

        '''
        iterate over the goals_list and get the corresponding
        values for each goal and the total value from the project
        '''
        if len(goals_list) > 0:
            for goal in goals_list:
                if goal in project['goals_needed']:
                    project['goals_total'] += 1
                    project['goals_matched'].append(goal)

        #Find the weighted total for the project

        project_total = 0
        project_total += (skills_factor * project['skills_total'])
        project_total += (interests_factor * project['interests_total'])
        project_total += (goals_factor * project['goals_total'])

        #add the weighted total to the project_scores list
        project['user_score'] = project_total

        """
        print
        print 'User match w/ ' + project['name']
        print ' skills ' + str(project['skills_total'])
        pp.pprint(project['skills_matched'])
        print ' interests ' + str(project['interests_total'])
        print ' goals ' + str(project['goals_total'])
        print ' total score = ' + str(project_total)
        """
        
        

    #create dictionary for project - key and project_score - value and set up values
    project_dict = {}

    #sorted_projects = sorted(project_list, key=lambda k: k['user_score'])
    from operator import itemgetter
    sorted_projects = sorted(projects_list, key=itemgetter('user_score'), reverse=True)

    outputln = ""
    for project in sorted_projects:
        seq = (
            str(project['_id']),
            project['name'],
            str(project['user_score']),
            
            'skills',
            str(project['skills_total']),
            "(" + " ".join(project['skills_matched']) + ")",
            
            'interests',
            str(project['interests_total']),
            "(" + " ".join(project['interests_matched']) + ")",
            
            'goals',
            str(project['goals_total']),
            "(" + " ".join(project['goals_matched']) + ")",
        )
        print ",".join(seq)


# if called from command line

if __name__ == "__main__":

    skills = sys.argv[1] if (len(sys.argv) > 1) else ""
    skills_list = skills.split(",")

    interests = sys.argv[2] if (len(sys.argv) > 2) else ""
    interests_list = interests.split(",")

    goals = sys.argv[3] if (len(sys.argv) > 3) else ""
    goals_list = goals.split(",")

    matchmaking (skills_list, interests_list, goals_list)
