/*def matchmaking (skills_list, interests_list, roles_list):

    """
    print 'matchmaking()'
    print 'skills='
    pp.pprint(skills_list)
    print 'interests='
    pp.pprint(interests_list)
    print 'roles='
    pp.pprint(roles_list)
    """

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

        project_total = 0
        project_total += (skills_factor * project['skills_total'])
        project_total += (interests_factor * project['interests_total'])
        project_total += (roles_factor * project['roles_total'])

        #add the weighted total to the project_scores list
        project['user_score'] = project_total

        """
        print
        print 'User match w/ ' + project['name']
        print ' skills ' + str(project['skills_total'])
        print ' interests ' + str(project['interests_total'])
        print ' roles ' + str(project['roles_total'])
        print ' total score = ' + str(project_total)
        """
*/

function matchmaking(skills_list, interests_list, roles_list){

  //iterate through projects list
  projects_list.forEach(function(project)){

    //Set up factors
    var skills_factor = 2;
    var interests_factor = 1;
    var roles_factor = 1;

    /*
      Set up project grand total
    */
    project["total"] = 0;

    //skills, interests, and roles subtotals
    var skills_total = 0;
    var interests_total = 0;
    var roles_total = 0;

    /*
      iterate over skills_list and get the number
      of skills matches between user and project
    */
    if (skills_list.length > 0){
      skills_list.forEach(function(skill){
        if (project["skills_needed"].indexOf(skill) !== -1){
          skills_total += 1;
        }
      })
    }

    if (interests_list.length > 0){
      interests_list.forEach(function(interests){
        if (project["interests_needed"].indexOf(interests) !== -1){
          interests_total += 1;
        }
      });
    }

    if (roles_list.length > 0){
      roles_list.forEach(function(roles){
        if (project["roles_needed"].indexOf(roles) !== -1){
          roles_total += 1;
        }
      });
    }

    var project_total = 0;
    project_total += (skills_factor * skills_total)
    project_total += (interests_factor * interests_total)
    project_total += (roles_factor * roles_total)

    project["total"] = project_total;

  }

}
