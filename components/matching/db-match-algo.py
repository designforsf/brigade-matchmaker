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

Interface:

    param skills_list: Skills that the user can contribute.
    param skills_offered_list: Skills the the user wants to learn.
    param interests_list: Interests of the user.
    param goals_list: Project-related goals of the user.

@usage:
    python ./db-match-algo.py client-dev/javascript,data-sci/python null housing developer,presenter
    python ./db-match-algo.py data-sci null homelessness developer
    python ./db-match-algo.py ruby null null developer,learner
    python ./db-match-algo.py null null null leader
    python ./db-match-algo.py null client-dev/javascript null null
"""

# database configuration
collection_name = 'brigade-matchmaker'
client = MongoClient('localhost', 27017)
db = client[collection_name]


# load the taxonomies and attributes from the database

""" NOTE: taxn_attributes below describes the data structure used in 
      breaking down the hierarchy of attributes submitted by users

taxn_attributes = {
    'skills': [
      {name: 'server-dev', parent: 'skills', synonyms: ['back-end']},
      {name: 'nodejs', parent: 'server-dev', synonyms: ['node']},
      {name: 'python', parent: 'server-dev', synonyms: ['django']},
    ],
    'interests': [
    ],
    'goals': [
    ]
}

"""

taxonomies = []
taxn_attributes = {}
taxn_name = ""

for attribute in db.projecttaxonomies.find({}):
    #pp.pprint(need)
    if attribute['parent'] == None:
      #print "taxonomy=" + attribute['name']
      taxonomies.append(attribute)
      taxn_name=attribute['name']
      taxn_attributes[taxn_name] = []
    else:
     #print " attribute=" + attribute['name']
     taxn_attributes[taxn_name].append(attribute)




""" NOTE: projects_list below is for understanding the data structure
            used in the algo (soon to reflect what is in the database)

projects_list = [
    {
        'id':'ux-research',
        'name':'UX Research',
        'interests':['all','community-organizer'],
        'skills_needed':['python','javascript','html'],
        'goals_needed':['developer','helper']
    },
    {
        'id':'data-sciences',
        'name':'Data Sciences',
        'interests':['all'],
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
    #pp.pprint(project['matchingConfig'])


    # NOTE: the algo will add the following data to project:

    # project['interests'] = []
    # project['interests_total'] = 0
    # project['interests_matched'] = []

    # project['skills_offered'] = []
    # project['skills_offered_categories'] = []
    # project['skills_offered_total'] = 0
    # project['skills_offered_matched'] = []

    # project['skills_needed'] = []
    # project['skills_needed_categories'] = []
    # project['skills_total'] = 0
    # project['skills_matched'] = []

    # project['goals_needed'] = []
    # project['goals_total'] = 0
    # project['goals_matched'] = []


    # interests
    project['interests'] = []
    for need in project['matchingConfig']['interests']:
        project['interests'].append(need)

    # skills offered
    project['skills_offered'] = []
    project['skills_offered_categories'] = []
    for offering in project['matchingConfig']['skillsOffered']:
        project['skills_offered'].append(offering)
        if "/" in offering:
            #print('category: ' + offering.split("/")[0])
            project['skills_offered_categories'].append(offering.split("/")[0])

    # skills needed
    project['skills_needed'] = []
    project['skills_needed_categories'] = []
    for need in project['matchingConfig']['skillsNeeded']:
        project['skills_needed'].append(need)
        if "/" in need:
            #print('category: ' + offering.split("/")[0])
            project['skills_needed_categories'].append(need.split("/")[0])

    # goals
    project['goals_needed'] = []
    for need in project['matchingConfig']['goalsNeeded']:
        project['goals_needed'].append(need)

    projects_list.append(project)
    projects_count += 1

# END loading projects list

def matchmaking (
    skills_list,                # targeting skills needed by project
    skills_offered_list,        # targeting skills offered by project
    interests_list,             # targeting shared interests
    goals_list                  # targeting goals needed by project
    ):

    """
    print 'matchmaking()'
    print 'skills='
    pp.pprint(skills_list)
    print 'skills_offered='
    pp.pprint(skills_offered_list)
    print 'interests='
    pp.pprint(interests_list)
    print 'goals='
    pp.pprint(goals_list)
    """

    #iterate over the projects
    for project in projects_list:

        # factors to prioritize skills
        skills_factor = 2
        skills_offered_factor = 2
        interests_factor = 1
        goals_factor = 1

        project['user_score'] = 0

        # in this project hold the totals for this user's
        #   skills, interests, and goals
        project['skills_total'] = 0
        project['skills_matched'] = []
        project['skills_offered_total'] = 0
        project['skills_offered_matched'] = []
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



                # category match# category match: category match to increase total score
                if "/" not in skill and skill in project['skills_needed_categories']:
                    #print 'skill needed = ' + skill
                    #pp.pprint(project['skills_needed_categories'])
                    project['skills_total'] += 1
                    project['skills_matched'].append(skill)

                # NOTE: initial work on category-related scoring
                #elif "/" in skill and skill.split("/")[0] in project['skills_needed_categories']:
                #    project['skills_total'] += 1



        '''
        iterate over the skills_offered_list and get the corresponding
        values for each skill offered and the total value from the project
        '''
        if len(skills_offered_list) > 0:
            for offering in skills_offered_list:
                if offering in project['skills_offered']:
                    project['skills_offered_total'] += 1
                    project['skills_offered_matched'].append(offering)

                # category match: category match to increase total score
                if "/" not in offering and offering in project['skills_offered_categories']:
                    #print 'skill offered ' + offering
                    #pp.pprint(project['skills_offered_categories'])
                    project['skills_offered_total'] += 1
                    project['skills_offered_matched'].append(skill)

                # NOTE: initial work on category-related scoring
                #elif "/" in offering and offering.split("/")[0] in project['skills_needed_categories']:
                #    project['skills_total'] += 1

        '''
        iterate over the interests_list and get the corresponding
        values for each interest and the total value from the project
        '''
        if len(interests_list) > 0:
            for interest in interests_list:
                if interest in project['interests']:
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
        project_total += (skills_offered_factor * project['skills_offered_total'])
        project_total += (interests_factor * project['interests_total'])
        project_total += (goals_factor * project['goals_total'])

        #add the weighted total to the project_scores list
        project['user_score'] = project_total

        """
        print
        print 'User match w/ ' + project['name']
        print ' skills ' + str(project['skills_total'])
        pp.pprint(project['skills_matched'])
        print ' skills offered ' + str(project['skills_offered_total'])
        pp.pprint(project['skills_offered_matched'])
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

            'skillsOffered',
            str(project['skills_offered_total']),
            "(" + " ".join(project['skills_offered_matched']) + ")",
 
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

    skills = sys.argv[1] if (len(sys.argv) > 1 and sys.argv[1] != 'null') else ""
    skills_list = skills.split(",")

    skills_offered = sys.argv[2] if (len(sys.argv) > 2 and sys.argv[2] != 'null') else ""
    skills_offered_list = skills_offered.split(",")

    interests = sys.argv[3] if (len(sys.argv) > 3 and sys.argv[3] != 'null') else ""
    interests_list = interests.split(",")

    goals = sys.argv[4] if (len(sys.argv) > 4 and sys.argv[4] != 'null') else ""
    goals_list = goals.split(",")

    matchmaking (skills_list, skills_offered_list, interests_list, goals_list)
