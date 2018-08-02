# for copying and pasting into the shell. This file will not run without the django.core component

from data.models import Team, Progress, Tasks, GoalsNeeded, SkillsOffered, SkillsNeeded, Interests, Needs, ThumbNailUrl, MatchingDescr, MatchingConfig, Projects

team1 = Team(avatar="cool_guy.jpg", username="paulj")
print(team1)

prog1 = Progress(progress="Added Ember to handle front-end")
prog2 = Progress(progress="Added Django to handle back-end")
task1 = Tasks(tasks="blank")
goals1 = GoalsNeeded(goalsNeeded="blank")
skills1 = SkillsOffered(skillsOffered="blank")
skills2 = SkillsNeeded(skillsNeeded="blank")
interests1 = Interests(interests="blank")
needs1 = Needs(needs="blank")
thumbnail1 = ThumbNailUrl(thumbNailUrl="blank")

desc1 = MatchingDescr(link="url here", repository="url here", progress=[prog1, prog2], tasks=task1, contactThumbNailUrl="blank", contactRole="blank", contactSlack="U67382674", contactEmail="paul@example.com", contactName="paul j", summary="blurb goes here", thumbNailUrl=thumbnail1)

print(desc1.progress[0])
print(desc1.progress[1])