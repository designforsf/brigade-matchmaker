urlize
======

An urlize module for Node.js. Turns a string into a string that can be used more easily as an URL.

1. Turns everything into lowercase
- Removes accents: äöå -> aoa
- Removes other characters than (i.e. keeps the following characters): `a-z 0-9 . _  -  (  ) /`
- Trims the string

##usage

npm install git://github.com/ile/urlize.git

> var urlize = require('urlize').urlize; 


> urlize("  ääliö älä lyö, ööliä läikkyy.HTML");  
> // aalio-ala-lyo-oolia-laikkyy.html

##drawbacks

Doesn't handle many foreign characters. Handles some.
