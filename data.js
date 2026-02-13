const data = {
  battles: [
    {
      id: 'd-day',
      name: {
        en: 'D-Day (Normandy Invasion)',
        hu: 'D-nap (Normandiai partraszállás)',
        ro: 'Ziua Z (Invazia Normandiei)'
      },
      description: {
        en: 'The Allied invasion of Normandy on June 6, 1944, opening the Western Front.',
        hu: 'A szövetségesek normandiai inváziója 1944. június 6-án, megnyitva a nyugati frontot.',
        ro: 'Invazia aliaților în Normandia la 6 iunie 1944, deschizând Frontul de Vest.'
      },
      year: 1944
    },
    {
      id: 'stalingrad',
      name: {
        en: 'Battle of Stalingrad',
        hu: 'Száljingrádi csata',
        ro: 'Bătălia de la Stalingrad'
      },
      description: {
        en: 'A major battle on the Eastern Front where the Soviets defeated the Germans.',
        hu: 'Egy nagy csata a keleti fronton, ahol a szovjetek legyőzték a németeket.',
        ro: 'O mare bătălie pe Frontul de Est unde sovieticii au învins germanii.'
      },
      year: 1942
    },
    {
      id: 'britain',
      name: {
        en: 'Battle of Britain',
        hu: 'Britanniái csata',
        ro: 'Bătălia Angliei'
      },
      description: {
        en: 'The air battle between the RAF and Luftwaffe in 1940.',
        hu: 'A légi csata az RAF és a Luftwaffe között 1940-ben.',
        ro: 'Bătălia aeriană dintre RAF și Luftwaffe în 1940.'
      },
      year: 1940
    }
  ],
  weapons: [
    {
      id: 'sherman',
      name: {
        en: 'M4 Sherman Tank',
        hu: 'M4 Sherman harckocsi',
        ro: 'Tanc M4 Sherman'
      },
      description: {
        en: 'An American medium tank used extensively by the Allies.',
        hu: 'Egy amerikai közepes harckocsi, amelyet a szövetségesek széles körben használtak.',
        ro: 'Un tanc mediu american folosit pe scară largă de către Aliați.'
      },
      type: {
        en: 'Ground',
        hu: 'Szárazföldi',
        ro: 'Terestru'
      },
      category: 'ground',
      picture: 'Ground_weapons.jpg'
    },
    {
      id: 'spitfire',
      name: {
        en: 'Supermarine Spitfire',
        hu: 'Supermarine Spitfire',
        ro: 'Supermarine Spitfire'
      },
      description: {
        en: 'A British fighter aircraft famous for its role in the Battle of Britain.',
        hu: 'Egy brit vadászrepülő, híres szerepéről a Britanniái csatában.',
        ro: 'Un avion de vânătoare britanic celebru pentru rolul său în Bătălia Angliei.'
      },
      type: {
        en: 'Air',
        hu: 'Légi',
        ro: 'Aerian'
      },
      category: 'air',
      picture: 'Air_weapons.jpg'
    },
    {
      id: 'v2',
      name: {
        en: 'V-2 Rocket',
        hu: 'V-2 rakéta',
        ro: 'Rachetă V-2'
      },
      description: {
        en: 'A German ballistic missile, the world\'s first long-range guided ballistic missile.',
        hu: 'Egy német ballisztikus rakéta, a világ első hosszú hatótávolságú irányított ballisztikus rakétája.',
        ro: 'O rachetă balistică germană, prima rachetă balistică ghidată cu rază lungă de acțiune din lume.'
      },
      type: {
        en: 'Air',
        hu: 'Légi',
        ro: 'Aerian'
      },
      category: 'air',
      picture: 'Air_weapons.jpg'
    },
    {
      id: 'yamato',
      name: {
        en: 'Yamato Battleship',
        hu: 'Jamato csatahajó',
        ro: 'Nava de război Yamato'
      },
      description: {
        en: 'The largest battleship ever built by Japan, known for its massive firepower.',
        hu: 'Japán által épített legnagyobb csatahajó, hatalmas tűzerejéről ismert.',
        ro: 'Cea mai mare navă de război construită vreodată de Japonia, cunoscută pentru puterea sa de foc masivă.'
      },
      type: {
        en: 'Water',
        hu: 'Vízi',
        ro: 'Acvatic'
      },
      category: 'water',
      picture: 'Water_weapons.jpg'
    }
  ]
};

const quiz = {
  questions: [
    {
      question: {
        en: 'In which year did the D-Day invasion occur?',
        hu: 'Melyik évben történt a D-nap invázió?',
        ro: 'În ce an a avut loc invazia Ziua Z?'
      },
      options: [
        { en: '1944', hu: '1944', ro: '1944' },
        { en: '1942', hu: '1942', ro: '1942' },
        { en: '1940', hu: '1940', ro: '1940' }
      ],
      answer: 0
    },
    {
      question: {
        en: 'Which battle is known as the turning point on the Eastern Front?',
        hu: 'Melyik csata ismert a keleti front fordulópontjaként?',
        ro: 'Care bătălie este cunoscută ca punct de cotitură pe Frontul de Est?'
      },
      options: [
        { en: 'Battle of Britain', hu: 'Britanniái csata', ro: 'Bătălia Angliei' },
        { en: 'Battle of Stalingrad', hu: 'Száljingrádi csata', ro: 'Bătălia de la Stalingrad' },
        { en: 'D-Day', hu: 'D-nap', ro: 'Ziua Z' }
      ],
      answer: 1
    },
    {
      question: {
        en: 'What type of weapon is the V-2?',
        hu: 'Milyen típusú fegyver a V-2?',
        ro: 'Ce tip de armă este V-2?'
      },
      options: [
        { en: 'Tank', hu: 'Harckocsi', ro: 'Tanc' },
        { en: 'Aircraft', hu: 'Repülőgép', ro: 'Avion' },
        { en: 'Rocket', hu: 'Rakéta', ro: 'Rachetă' }
      ],
      answer: 2
    },
    {
      question: {
        en: 'Which aircraft was famous in the Battle of Britain?',
        hu: 'Melyik repülő volt híres a Britanniái csatában?',
        ro: 'Care avion a fost celebru în Bătălia Angliei?'
      },
      options: [
        { en: 'M4 Sherman', hu: 'M4 Sherman', ro: 'M4 Sherman' },
        { en: 'Supermarine Spitfire', hu: 'Supermarine Spitfire', ro: 'Supermarine Spitfire' },
        { en: 'V-2 Rocket', hu: 'V-2 rakéta', ro: 'Rachetă V-2' }
      ],
      answer: 1
    },
    {
      question: {
        en: 'True or False: The Battle of Stalingrad was in 1942.',
        hu: 'Igaz vagy hamis: A Száljingrádi csata 1942-ben volt.',
        ro: 'Adevărat sau fals: Bătălia de la Stalingrad a fost în 1942.'
      },
      options: [
        { en: 'True', hu: 'Igaz', ro: 'Adevărat' },
        { en: 'False', hu: 'Hamis', ro: 'Fals' }
      ],
      answer: 0
    }
  ]
};

module.exports = { data, quiz };