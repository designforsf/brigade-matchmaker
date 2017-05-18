import sys
import pprint
pp = pprint.PrettyPrinter();

#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Created on Wed Oct 12 20:30:54 2016

@author: ryanlim

@usage:
    python ./match-algo.py javascript,python housing developer,presenter

"""

projects_list = [
    {
        'id':'ux-research',
        'name':'UX Research',
        'interests_needed':['all','community-organizer'],
        'skills_needed':['python','javascript','html'],
        'roles_needed':['developer','helper']
    },
    {
        'id':'data-sciences',
        'name':'Data Sciences',
        'interests_needed':['all'],
        'skills_needed':['python'],
        'roles_needed':['developer']
    }
]

def matchmaking (skills_list, interests_list, roles_list):

    print 'matchmaking()'

    print 'skills='
    pp.pprint(skills_list)
    print 'interests='
    pp.pprint(interests_list)
    print 'roles='
    pp.pprint(roles_list)

    #iterate over the projects
    for project in projects_list:

        # factors to prioritize skills
        skills_factor = 2
        interests_factor = 1
        roles_factor = 1

        project['user_score'] = 0

        # in this project hold the totals for this user's
        #   skills, interests, and roles
        project['skills_total'] = 0
        project['interests_total'] = 0
        project['roles_total'] = 0

        '''
        iterate over the skills_list and get the corresponding
        values for each skill and the total value from the project
        '''
        if len(skills_list) > 0:
            for skill in skills_list:
                if skill in project['skills_needed']:
                    project['skills_total'] += 1

        '''
        iterate over the interests_list and get the corresponding
        values for each interest and the total value from the project
        '''
        if len(interests_list) > 0:
            for interest in interests_list:
                if interest in project['interests_needed']:
                    project['interests_total'] += 1

        '''
        iterate over the roles_list and get the corresponding
        values for each role and the total value from the project
        '''
        if len(roles_list) > 0:
            for role in roles_list:
                if role in project['roles_needed']:
                    project['roles_total'] += 1

        #Find the weighted total for the project
        print
        print 'User match w/ ' + project['name']
        project_total = 0
        project_total += (skills_factor * project['skills_total'])
        print ' skills ' + str(project['skills_total'])
        project_total += (interests_factor * project['interests_total'])
        print ' interests ' + str(project['interests_total'])
        project_total += (roles_factor * project['roles_total'])
        print ' roles ' + str(project['roles_total'])

        #add the weighted total to the project_scores list
        project['user_score'] = project_total
        print ' total score = ' + str(project_total)

    #create dictionary for project - key and project_score - value and set up values
    project_dict = {}

    #sorted_projects = sorted(project_list, key=lambda k: k['user_score'])
    from operator import itemgetter
    sorted_projects = sorted(projects_list, key=itemgetter('user_score'), reverse=True)

    print
    print 'Sorted Output:'

    outputln = ""
    for project in sorted_projects:
        seq = (project['id'], project['name'], str(project['user_score']))
        print ",".join(seq)


# if called from command line

if __name__ == "__main__":

    skills = sys.argv[1] if (len(sys.argv) > 1) else ""
    skills_list = skills.split(",")

    interests = sys.argv[2] if (len(sys.argv) > 2) else ""
    interests_list = interests.split(",")

    roles = sys.argv[3] if (len(sys.argv) > 3) else ""
    roles_list = roles.split(",")

    matchmaking (skills_list, interests_list, roles_list)
