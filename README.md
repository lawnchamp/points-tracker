# Site description
https://points.live is used to track points for multiple teams across many different competitions. For example dodgeball may give 300 points to the blue team in the afternoon but later in the day the red team won the singing competition and earned 100 points.

# Summer Camp Pain Points
## As a highschooler attending the camp
* I have just been told my team has 3405 points.
  * Where are these points coming from?
  * Why does the team in first have triple our team score? How is that even possible given that we beat them yesterday in dodgeball?
  * When we won dodgeball did the admin team give us 500 points or did they make a mistake and give 200?
  * My teammate pulled a prank on the camp admin cabin last night, do they hate my team now and thats why we are losing?
  * How are all the competitions weighted? Is winning dodgeball the same coming in first place for the all camp relay race?
## As a camp team leader
* I have no ability to help the camp admin score the events
## As a camp admin
* It is a lot of work to record points from competitions happening all across the camp at the same time. Coordinating with all the referees is not easy.
* There is a lot of pressure to record everything exactly right.
  * Opening the scores to the public ensures everything is recorded correctly. If someone in the camps notices something is off it is very easy to edit the history
  * Giving team leaders the option to record points for themselves takes a lot of work off of the admin team. Admin need to just sit back and approve points



# User rolls:
### Students
* Can look at what events are giving their team points and also see how other teams are getting points
* All points students view must be approved and published
### Team Leaders
* Can submit points for their team throughout the day based off of how they did in different competitions
* Can see if points they submitted were approved
* Can not see points other teams have submitted or have been approved until they have been published
### Camp Admin
* Can submit points for any team
* Can approve points submitted by team leaders
* Can publish points that let the entire camp see the competition

# Development

[traefik](https://github.com/containous/traefik)
[mkcert](https://github.com/FiloSottile/mkcert)

```bash
yarn install
make cert # only do this once
docker-compose up -d
yarn serve
```