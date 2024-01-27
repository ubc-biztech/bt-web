// list of unstandardized emails in our DB and their standardized counterparts
// @TODO replace these emails in the db permanently, and remove this

const CAPITALIZED_EMAILS = process.env.REACT_APP_STAGE === "production" ? [
  {
    "email": "Hashaamzafar2003@Gmail.com",
    "lowercaseEmail": "hashaamzafar2003@gmail.com"
  },
  {
    "email": "Mingxin.gong2@gmail.com",
    "lowercaseEmail": "mingxin.gong2@gmail.com"
  },
  {
    "email": "Tejyashwarsingh72@gmail.com",
    "lowercaseEmail": "tejyashwarsingh72@gmail.com"
  },
  {
    "email": "Setimalek@gmail.com",
    "lowercaseEmail": "setimalek@gmail.com"
  },
  {
    "email": "Zhaotongchen03@icloud.com",
    "lowercaseEmail": "zhaotongchen03@icloud.com"
  },
  {
    "email": "Isoldevyy@gmail.com",
    "lowercaseEmail": "isoldevyy@gmail.com"
  },
  {
    "email": "Lidonna318@gmail.com",
    "lowercaseEmail": "lidonna318@gmail.com"
  },
  {
    "email": "Lindyg2000@gmail.com",
    "lowercaseEmail": "lindyg2000@gmail.com"
  },
  {
    "email": "Phillip_li@hotmail.com",
    "lowercaseEmail": "phillip_li@hotmail.com"
  },
  {
    "email": "Jamesk020711@gmail.com",
    "lowercaseEmail": "jamesk020711@gmail.com"
  },
  {
    "email": "Erpingsun@gmail.com",
    "lowercaseEmail": "erpingsun@gmail.com"
  },
  {
    "email": "Jonathon.liu@outlook.com",
    "lowercaseEmail": "jonathon.liu@outlook.com"
  },
  {
    "email": "Khuranasahaj3@gmail.com",
    "lowercaseEmail": "khuranasahaj3@gmail.com"
  },
  {
    "email": "Tarun.bhambhani7663@gmail.com",
    "lowercaseEmail": "tarun.bhambhani7663@gmail.com"
  },
  {
    "email": "EdwardliaNgedli@gmail.com",
    "lowercaseEmail": "edwardliangedli@gmail.com"
  },
  {
    "email": "Simonzhou3@hotmail.com",
    "lowercaseEmail": "simonzhou3@hotmail.com"
  },
  {
    "email": "Nathanr8@student.ubc.ca",
    "lowercaseEmail": "nathanr8@student.ubc.ca"
  },
  {
    "email": "Eeshasm7@gmail.com",
    "lowercaseEmail": "eeshasm7@gmail.com"
  },
  {
    "email": "Ryandouglascarr@gmail.com",
    "lowercaseEmail": "ryandouglascarr@gmail.com"
  },
  {
    "email": "Dhruvs4747@gmail.com",
    "lowercaseEmail": "dhruvs4747@gmail.com"
  },
  {
    "email": "Simrandaya.4@gmail.com",
    "lowercaseEmail": "simrandaya.4@gmail.com"
  },
  {
    "email": "Lara.kardouh@gmail.com",
    "lowercaseEmail": "lara.kardouh@gmail.com"
  },
  {
    "email": "Benyapabenjasiriwan@gmail.com",
    "lowercaseEmail": "benyapabenjasiriwan@gmail.com"
  },
  {
    "email": "Rachelwang0432@gmail.com",
    "lowercaseEmail": "rachelwang0432@gmail.com"
  },
  {
    "email": "Annette.wong1317@gmail.com",
    "lowercaseEmail": "annette.wong1317@gmail.com"
  },
  {
    "email": "Janeliu2022@gmail.com",
    "lowercaseEmail": "janeliu2022@gmail.com"
  },
  {
    "email": "Rythemshah2004@gmail.com",
    "lowercaseEmail": "rythemshah2004@gmail.com"
  },
  {
    "email": "Patriciaduong10@gmail.com",
    "lowercaseEmail": "patriciaduong10@gmail.com"
  },
  {
    "email": "DavidCclaremont@gmail.com",
    "lowercaseEmail": "davidcclaremont@gmail.com"
  },
  {
    "email": "Adamjhardy96@gmail.com",
    "lowercaseEmail": "adamjhardy96@gmail.com"
  },
  {
    "email": "Barakahmedd@gmail.com",
    "lowercaseEmail": "barakahmedd@gmail.com"
  },
  {
    "email": "Dantanwork23@gmail.com",
    "lowercaseEmail": "dantanwork23@gmail.com"
  },
  {
    "email": "Ashleykchan@gmail.com",
    "lowercaseEmail": "ashleykchan@gmail.com"
  },

  {
    "email": "Billyxwn@gmail.com",
    "lowercaseEmail": "billyxwn@gmail.com"
  },

  {
    "email": "Bogosi@gmail.com",
    "lowercaseEmail": "bogosi@gmail.com"
  },

  {
    "email": "Bxa25@sfu.ca",
    "lowercaseEmail": "bxa25@sfu.ca"
  },

  {
    "email": "Erpingsun@gmail.com",
    "lowercaseEmail": "erpingsun@gmail.com"
  },

  {
    "email": "Jaskirat880singh@gmail.com",
    "lowercaseEmail": "jaskirat880singh@gmail.com"
  },

  {
    "email": "Lara.kardouh@gmail.com",
    "lowercaseEmail": "lara.kardouh@gmail.com"
  },

  {
    "email": "Nathanr8@student.ubc.ca",
    "lowercaseEmail": "nathanr8@student.ubc.ca"
  },

  {
    "email": "Nhashemzadeh2003@gmail.com",
    "lowercaseEmail": "nhashemzadeh2003@gmail.com"
  },

  {
    "email": "Omar.ankit2001@gmail.com",
    "lowercaseEmail": "omar.ankit2001@gmail.com"
  },
  {
    "email": "Romanechose@gmail.com",
    "lowercaseEmail": "romanechose@gmail.com"
  },
  {
    "email": "Suryanshh111@gmail.com",
    "lowercaseEmail": "suryanshh111@gmail.com"
  }
] : [
  {
    "email": "Hashaamzafar2003@Gmail.com",
    "lowercaseEmail": "hashaamzafar2003@gmail.com"
  },
  {
    "email": "Mingxin.gong2@gmail.com",
    "lowercaseEmail": "mingxin.gong2@gmail.com"
  },
  {
    "email": "Tejyashwarsingh72@gmail.com",
    "lowercaseEmail": "tejyashwarsingh72@gmail.com"
  },
  {
    "email": "Setimalek@gmail.com",
    "lowercaseEmail": "setimalek@gmail.com"
  },
  {
    "email": "Zhaotongchen03@icloud.com",
    "lowercaseEmail": "zhaotongchen03@icloud.com"
  },
  {
    "email": "Isoldevyy@gmail.com",
    "lowercaseEmail": "isoldevyy@gmail.com"
  },
  {
    "email": "Lidonna318@gmail.com",
    "lowercaseEmail": "lidonna318@gmail.com"
  },
  {
    "email": "Lindyg2000@gmail.com",
    "lowercaseEmail": "lindyg2000@gmail.com"
  },
  {
    "email": "Phillip_li@hotmail.com",
    "lowercaseEmail": "phillip_li@hotmail.com"
  },
  {
    "email": "Jamesk020711@gmail.com",
    "lowercaseEmail": "jamesk020711@gmail.com"
  },
  {
    "email": "Erpingsun@gmail.com",
    "lowercaseEmail": "erpingsun@gmail.com"
  },
  {
    "email": "Jonathon.liu@outlook.com",
    "lowercaseEmail": "jonathon.liu@outlook.com"
  },
  {
    "email": "Khuranasahaj3@gmail.com",
    "lowercaseEmail": "khuranasahaj3@gmail.com"
  },
  {
    "email": "Tarun.bhambhani7663@gmail.com",
    "lowercaseEmail": "tarun.bhambhani7663@gmail.com"
  },
  {
    "email": "EdwardliaNgedli@gmail.com",
    "lowercaseEmail": "edwardliangedli@gmail.com"
  },
  {
    "email": "Simonzhou3@hotmail.com",
    "lowercaseEmail": "simonzhou3@hotmail.com"
  },
  {
    "email": "Nathanr8@student.ubc.ca",
    "lowercaseEmail": "nathanr8@student.ubc.ca"
  },
  {
    "email": "Eeshasm7@gmail.com",
    "lowercaseEmail": "eeshasm7@gmail.com"
  },
  {
    "email": "Ryandouglascarr@gmail.com",
    "lowercaseEmail": "ryandouglascarr@gmail.com"
  },
  {
    "email": "Dhruvs4747@gmail.com",
    "lowercaseEmail": "dhruvs4747@gmail.com"
  },
  {
    "email": "Simrandaya.4@gmail.com",
    "lowercaseEmail": "simrandaya.4@gmail.com"
  },
  {
    "email": "Lara.kardouh@gmail.com",
    "lowercaseEmail": "lara.kardouh@gmail.com"
  },
  {
    "email": "Benyapabenjasiriwan@gmail.com",
    "lowercaseEmail": "benyapabenjasiriwan@gmail.com"
  },
  {
    "email": "Rachelwang0432@gmail.com",
    "lowercaseEmail": "rachelwang0432@gmail.com"
  },
  {
    "email": "Annette.wong1317@gmail.com",
    "lowercaseEmail": "annette.wong1317@gmail.com"
  },
  {
    "email": "Janeliu2022@gmail.com",
    "lowercaseEmail": "janeliu2022@gmail.com"
  },
  {
    "email": "Rythemshah2004@gmail.com",
    "lowercaseEmail": "rythemshah2004@gmail.com"
  },
  {
    "email": "Patriciaduong10@gmail.com",
    "lowercaseEmail": "patriciaduong10@gmail.com"
  },
  {
    "email": "DavidCclaremont@gmail.com",
    "lowercaseEmail": "davidcclaremont@gmail.com"
  },
  {
    "email": "Adamjhardy96@gmail.com",
    "lowercaseEmail": "adamjhardy96@gmail.com"
  },
  {
    "email": "Barakahmedd@gmail.com",
    "lowercaseEmail": "barakahmedd@gmail.com"
  },
  {
    "email": "Dantanwork23@gmail.com",
    "lowercaseEmail": "dantanwork23@gmail.com"
  },
  {
    "email": "Ashleykchan@gmail.com",
    "lowercaseEmail": "ashleykchan@gmail.com"
  },

  {
    "email": "Billyxwn@gmail.com",
    "lowercaseEmail": "billyxwn@gmail.com"
  },

  {
    "email": "Bogosi@gmail.com",
    "lowercaseEmail": "bogosi@gmail.com"
  },

  {
    "email": "Bxa25@sfu.ca",
    "lowercaseEmail": "bxa25@sfu.ca"
  },

  {
    "email": "Erpingsun@gmail.com",
    "lowercaseEmail": "erpingsun@gmail.com"
  },

  {
    "email": "Jaskirat880singh@gmail.com",
    "lowercaseEmail": "jaskirat880singh@gmail.com"
  },

  {
    "email": "Lara.kardouh@gmail.com",
    "lowercaseEmail": "lara.kardouh@gmail.com"
  },

  {
    "email": "Nathanr8@student.ubc.ca",
    "lowercaseEmail": "nathanr8@student.ubc.ca"
  },

  {
    "email": "Nhashemzadeh2003@gmail.com",
    "lowercaseEmail": "nhashemzadeh2003@gmail.com"
  },

  {
    "email": "Omar.ankit2001@gmail.com",
    "lowercaseEmail": "omar.ankit2001@gmail.com"
  },
  {
    "email": "Romanechose@gmail.com",
    "lowercaseEmail": "romanechose@gmail.com"
  },
  {
    "email": "Suryanshh111@gmail.com",
    "lowercaseEmail": "suryanshh111@gmail.com"
  }
];

export default CAPITALIZED_EMAILS;

