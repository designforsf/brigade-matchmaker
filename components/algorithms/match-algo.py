import sys
import pprint
pp = pprint.PrettyPrinter();

#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Wed Oct 12 20:30:54 2016

@author: ryanlim
"""

projects_list = [{'id':'ux-research'}, {'id':'data-sciences'}]

def matchmaking (skills_list, interests_list, roles_list):

    print 'matchmaking()'

    print 'skills='
    pp.pprint(skills_list)
    print 'interests='
    pp.pprint(interests_list)
    print 'roles='
    pp.pprint(roles_list)

    #declare a list with scores for each project
    project_scores = []

    #iterate over the projects
    for project in projects_list:

        #get the different factors for skills, interests, and roles
        #skills_factor = project[skills_factor]
        #interests_factor = project[interests_factor]
        #roles_factor = project[roles_factor]
        skills_factor = 1
        interests_factor = 1
        roles_factor = 1

        #declare variables to hold the totals for skills, interests, and roles
        skills_total = 0
        interests_total = 0
        roles_total = 0

        '''
        iterate over the skills_list and get the corresponding
        values for each skill and the total value from the project
        '''
        if len(skills_list) > 0:
            for skill in skills_list:
                #skills_total += project[skill]
                skills_total += 1

        '''
        iterate over the interests_list and get the corresponding
        values for each interest and the total value from the project
        '''
        if len(interests_list) > 0:
            for interest in interests_list:
                #interests_total += project[interest]
                interests_total += 1

        '''
        iterate over the roles_list and get the corresponding
        values for each role and the total value from the project
        '''
        if len(roles_list) > 0:
            for role in roles_list:
                #roles_total += project[role]
                roles_total += 1

        #Find the weighted total for the project
        project_total = 0
        #project_total += (skills_factor * skills_total)
        #project_total += (interest_factor * interests_total)
        #project_total += (roles_factor * roles_total)

        #add the weighted total to the project_scores list
        project_scores.append(project_total)

    #create dictionary for project - key and project_score - value and set up values
    project_dict = {}

    index = 0
    while (index < len(projects_list)):
        #project_dict[project[index]] = project_scores[index]
        index += 1


# if called from command line

if __name__ == "__main__":

    skills = sys.argv[1] if (len(sys.argv) > 1) else ""
    skills_list = skills.split(",")

    interests = sys.argv[2] if (len(sys.argv) > 2) else ""
    interests_list = interests.split(",")

    roles = sys.argv[3] if (len(sys.argv) > 3) else ""
    roles_list = roles.split(",")

    matchmaking (skills_list, interests_list, roles_list)
