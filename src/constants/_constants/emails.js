// list of unstandardized emails in our DB and their standardized counterparts
// @TODO replace these emails in the db permanently, and remove this

const CAPITALIZED_EMAILS = process.env.REACT_APP_STAGE === "production" ? [
  {
    "email": "Hashaamzafar2003@Gmail.com",
    "lowercaseEmail": "hashaamzafar2003@gmail.com"
  },
  {
    "email": "Andrii.maxurmc@gmail.com",
    "lowercaseEmail": "andrii.maxurmc@gmail.com"
  },
  {
    "email": "Kcgroulx@gmail.com",
    "lowercaseEmail": "kcgroulx@gmail.com"
  },
  {
    "email": "Amyxcao17007@gmail.com",
    "lowercaseEmail": "amyxcao17007@gmail.com"
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
    "email": "Henryleungj@gmail.com",
    "lowercaseEmail": "henryleungj@gmail.com"
  },
  {
    "email": "Setimalek@gmail.com",
    "lowercaseEmail": "setimalek@gmail.com"
  },
  {
    "email": "Genaelhemely@aol.com",
    "lowercaseEmail": "genaelhemely@aol.com"
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
    "email": "Shuklarohan@live.com",
    "lowercaseEmail": "shuklarohan@live.com"
  },
  {
    "email": "Jakeyeozh@gmail.com",
    "lowercaseEmail": "jakeyeozh@gmail.com"
  },
  {
    "email": "Lidonna318@gmail.com",
    "lowercaseEmail": "lidonna318@gmail.com"
  },
  {
    "email": "Tate.carterp@gmail.com",
    "lowercaseEmail": "tate.carterp@gmail.com"
  },
  {
    "email": "Vitorwak2@gmail.com",
    "lowercaseEmail": "vitorwak2@gmail.com"
  },
  {
    "email": "Stellawan38@gmail.com",
    "lowercaseEmail": "stellawan38@gmail.com"
  },
  {
    "email": "Lindyg2000@gmail.com",
    "lowercaseEmail": "lindyg2000@gmail.com"
  },
  {
    "email": "Nikarasahad@gmail.com",
    "lowercaseEmail": "nikarasahad@gmail.com"
  },
  {
    "email": "J.xue0816@gmail.com",
    "lowercaseEmail": "j.xue0816@gmail.com"
  },
  {
    "email": "Phillip_li@hotmail.com",
    "lowercaseEmail": "phillip_li@hotmail.com"
  },
  {
    "email": "Sallin.koutev@gmail.com",
    "lowercaseEmail": "sallin.koutev@gmail.com"
  },
  {
    "email": "Shenkobe.111@gmail.com",
    "lowercaseEmail": "shenkobe.111@gmail.com"
  },
  {
    "email": "Jamesk020711@gmail.com",
    "lowercaseEmail": "jamesk020711@gmail.com"
  },
  {
    "email": "Kkmin123446@gmail.com",
    "lowercaseEmail": "kkmin123446@gmail.com"
  },
  {
    "email": "SAMANTHAYEUNG0430@GMAIL.COM",
    "lowercaseEmail": "samanthayeung0430@gmail.com"
  },
  {
    "email": "Deolaa40@gmail.com",
    "lowercaseEmail": "deolaa40@gmail.com"
  },
  {
    "email": "Erpingsun@gmail.com",
    "lowercaseEmail": "erpingsun@gmail.com"
  },
  {
    "email": "Armanmeh0973@gmail.com",
    "lowercaseEmail": "armanmeh0973@gmail.com"
  },
  {
    "email": "Jonathon.liu@outlook.com",
    "lowercaseEmail": "jonathon.liu@outlook.com"
  },
  {
    "email": "M.mousaei@outlook.com",
    "lowercaseEmail": "m.mousaei@outlook.com"
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
    "email": "Suryanshh111@gmail.com",
    "lowercaseEmail": "suryanshh111@gmail.com"
  },
  {
    "email": "Romanechose@gmail.com",
    "lowercaseEmail": "romanechose@gmail.com"
  },
  {
    "email": "Pantea1381@gmail.com",
    "lowercaseEmail": "pantea1381@gmail.com"
  },
  {
    "email": "Simonzhou3@hotmail.com",
    "lowercaseEmail": "simonzhou3@hotmail.com"
  },
  {
    "email": "Rahejasarah04@gmail.com",
    "lowercaseEmail": "rahejasarah04@gmail.com"
  },
  {
    "email": "Alex.leon.limin@gmail.com",
    "lowercaseEmail": "alex.leon.limin@gmail.com"
  },
  {
    "email": "Nayeshakhurana123@gmail.com",
    "lowercaseEmail": "nayeshakhurana123@gmail.com"
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
    "email": "Weenawibowo@hotmail.com",
    "lowercaseEmail": "weenawibowo@hotmail.com"
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
    "email": "Sophia.shanshan.li@icloud.com",
    "lowercaseEmail": "sophia.shanshan.li@icloud.com"
  },
  {
    "email": "Jessicazwliu@gmail.com",
    "lowercaseEmail": "jessicazwliu@gmail.com"
  },
  {
    "email": "Rachelwang0432@gmail.com",
    "lowercaseEmail": "rachelwang0432@gmail.com"
  },
  {
    "email": "Antonia.capricee@gmail.com",
    "lowercaseEmail": "antonia.capricee@gmail.com"
  },
  {
    "email": "Annette.wong1317@gmail.com",
    "lowercaseEmail": "annette.wong1317@gmail.com"
  },
  {
    "email": "Omar.ankit2001@gmail.com",
    "lowercaseEmail": "omar.ankit2001@gmail.com"
  },
  {
    "email": "Janeliu2022@gmail.com",
    "lowercaseEmail": "janeliu2022@gmail.com"
  },
  {
    "email": "Evanxnawfal@gmail.com",
    "lowercaseEmail": "evanxnawfal@gmail.com"
  },
  {
    "email": "Rythemshah2004@gmail.com",
    "lowercaseEmail": "rythemshah2004@gmail.com"
  },
  {
    "email": "Amelijaolson@gmail.com",
    "lowercaseEmail": "amelijaolson@gmail.com"
  },
  {
    "email": "ANGK0064@e.ntu.edu.sg",
    "lowercaseEmail": "angk0064@e.ntu.edu.sg"
  },
  {
    "email": "Gilmanalice555@gmail.com",
    "lowercaseEmail": "gilmanalice555@gmail.com"
  },
  {
    "email": "Jasmxnechen113@gmail.com",
    "lowercaseEmail": "jasmxnechen113@gmail.com"
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
  }
];

export default CAPITALIZED_EMAILS;

