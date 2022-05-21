getOptions = () => {
  return {
      method: 'GET',
  }
}

// Assumes Handlebars has been preloaded
getTemplate = async (url) => {
  try {
    let response = await fetch(url, getOptions());
    let text = await response.text();
    let template = Handlebars.compile(text);
    return template;
  } catch (error) {
    throw error;
  }
}

handleGet = async (url) => {
  try {
    let response = await fetch(url, getOptions());
    let text = await response.text();
    return text;
  } catch (error) {
    throw error;
  }
}





/* Simple 10ms delay, useful for initial loop when 
awaiting an asynchronous load of some resource.
Call from within an async function, i.e., 
var result = await delay(); */
function delay() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("resolved");
    }, 10);
  });
}

function getParamsFromRequest(request) {

  let { parameters } = request;

  let paramObj = {};

  if (request.parameters[0]) {
    for (let el of parameters) {
      let [ name, value ] = el.split("=");

      if (value) {
        value = value.replace(/\+/g," ");
        paramObj[name] = value;
      } else {
        paramObj[name] = null;
      }
      
    }

  }
  return paramObj;

}

function getFromProperties(allServices, attrName) {

  let attrArray = [];
  for (let p of allServices) {
      if (!attrArray.includes(p[attrName])) attrArray.push(p[attrName]);
  }

  return attrArray;

}

// Borrowed from D3 code :-)
let shuffle = function(array, i0, i1) {
  if ((m = arguments.length) < 3) {
    i1 = array.length;
    if (m < 2) i0 = 0;
  }
  var m = i1 - i0, t, i;
  while (m) {
    i = Math.random() * m-- | 0;
    t = array[m + i0], array[m + i0] = array[i + i0], array[i + i0] = t;
  }
  return array;
};



/* Register Handlebars helpers for views */
function registerHandlebarsHelpers() {

  Handlebars.registerHelper("iconize", function(data) {
    let str;

    switch (data) {
      case "male":
        str = "<i class='fas fa-male'></i>";
        break;
      case "female":
        str = "<i class='fas fa-female'></i>";
        break;
      default:
        str = "?";
    }
    return new Handlebars.SafeString(str);
  });
}

function loadDefaultServices() {
    return defaultServices;
}

registerHandlebarsHelpers();

let defaultServices = [
  {
    id: 0,
    title: "Medicare & Health Insurance",
    description: "Medical expenses can be... ",
    shortDescription: "The best in the business....",
    status: "offer",
    imageFilename: "nylife1.png",
    dateCreated: "2019-06-10T21:09:19.280Z",
    dateUpdated: "2019-06-10T21:09:19.280Z",
    "": "",
  },
  {
    id: 2,
    title: "Retirement Planning",
    description: "Planning for retirement?  ...",
    shortDescription: "Protect your future....",
    status: "offer",
    imageFilename: "nylife2.png",
    dateCreated: "2019-06-10T21:14:43.167Z",
    dateUpdated: "2019-06-10T21:14:43.167Z",
    "": "",
  },
  {
    id: 3,
    title: "Financial Planning & Investments",
    description: "Secure your future....",
    shortDescription: "The strongest hand....",
    status: "offer",
    imageFilename: "nylife3.png",
    dateCreated: "2019-06-10T21:15:44.247Z",
    dateUpdated: "2019-06-10T21:15:44.247Z",
    "": "",
  },
  {
    id: 1,
    title: "Life & Disability Insurance",
    description: "Fit for kings and queens....",
    shortDescription: "Prepare for contingencies....",
    status: "offer",
    imageFilename: "nylife4.png",
    dateCreated: "2019-06-10T21:14:09.271Z",
    dateUpdated: "2019-06-10T21:16:05.967Z",
    "": "",
  },
];

let testimonials = [

  { 
    title: "Amazing service!", 
    testimonial: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi veritatis exercitationem sapiente temporibus aut!", 
    image: "testimonial_1.jpg",
    name: "Diane Smith",
    role: "client"
  },
  { 
    title: "Great smile, great products", 
    testimonial: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi veritatis exercitationem sapiente temporibus aut!", 
    image: "testimonial_2.jpg",
    name: "Michael Duncan",
    role: "client"
  },
  { 
    title: "Very good communication", 
    testimonial: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi veritatis exercitationem sapiente temporibus aut!", 
    image: "testimonial_3.jpg",
    name: "Shawn Gaines",
    role: "client"
  }

];