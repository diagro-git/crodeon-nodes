<p align="center">
  <img src="https://user-images.githubusercontent.com/6877485/210876437-1ee419a6-64ea-4be9-a715-8014bf4c9039.png" alt="Jeebby" />
</p>

# What is Jeebby?

The name Jeebby doesn't have a meaning. It's just a random name for this project.
But what is Jeebby? It's a tool that let novice IT people to run simple programs on their IOT devices.
The user buys an IOT device, buys sensors but wants to run a custom program. The user has to read manuals, learn tools and languages and then start writting/composing it's little program. This is good for IT minded people, but not the common person.
Jeebby is the tool to deploy and manage the programs the users wants to connect with their IOT. In the background they deploy a Node-RED flow with their own parameters. If they want, they can open their program in Node-RED and extend, modify, debug, ... it.

# Simple programs

Jeebby will be released with a shop where people can download/buy simple programs. These are Node-RED flows with parameters. These parameters can be managed on the Jeebby platform. These flows run on the Node-RED instance of the installation.

Every program get it's own Github repository and has the Node-RED flow structure with an extra configuration file named **jeebby.conf**

# Node-RED

Every installation requires a Node-RED instance. The Jeebby flows are deployed on this Node-RED instance. Every program runs in it's own Node-RED tab.

# SaaS
The platform is downloable and installable for everybody but their is a SaaS solution if users doesn't want to run it on their own infrastructure. But we support users to run this on a simple device like a Raspberry PI.

# Example situation
As a farmer you buy an IOT device like Crodeon and attach a soil sensor, a water pressure sensor and connect the water valve to a relais output from Crodeon. You buy a Jeebby program that closes relais output when water pressure is lower than 1 bar and opens the relais output when the pressure is higher then 1 bar and soil sensor is less then 35%. So you as a farmer buys this program, set the parameters and click run. In addition you can control the execution of this program. For example you want this program only to run from monday-friday between 8h-21h. And in addition you say to keep track of the sensor values and view the history. And last addition is that you can see the output of the program. So you know when the valve is closed and opened.

All this is done with simple buy, install and run steps.
