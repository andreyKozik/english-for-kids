// import {Topics} from './topiс';
export const topicObject = {
  Animals: [['Bear', 'Медведь'], ['Cat', 'Кошка'], ['Dog', 'Собака'], ['Fox', 'Лиса'],
    ['Frog', 'Лягушка'], ['Rabbit', 'Кролик'], ['Snake', 'Змея'], ['Wolf', 'Волк']],
  Body_parts: [['Arm', 'Рука'], ['Back', 'Спина'], ['Ear', 'Ухо'], ['Finger', 'Палец'],
    ['Head', 'Голова'], ['Leg', 'Нога'], ['Mouth', 'Рот'], ['Nose', 'Нос']],
  Clothes: [['Belt', 'Пояс'], ['Dress', 'Платье'], ['Glove', 'Перчатка'], ['Hat', 'Шапка'],
    ['Pants', 'Брюки'], ['Shoes', 'Обувь'], ['Shorts', 'Шорты'], ['Skirt', 'Юбка']],
  Colors: [['Black', 'Черный'], ['Blue', 'Синий'], ['Brown', 'Коричневый'], ['Green', 'Зеленый'],
    ['Orange', 'Оранжевый'], ['Purple', 'Фиолетовый'], ['Red', 'Красный'], ['Yellow', 'Желтый']],
  Emotions: [['Angry', 'Злой'], ['Fear', 'Страх'], ['Joy', 'Радость'], ['Sadness', 'Грусть'],
    ['Shame', 'Стыд'], ['Shy', 'Застенчивый'], ['Tired', 'Усталый'], ['Wonder', 'Чудо']],
  Family: [['Baby', 'Ребёнок'], ['Brother', 'Брат'], ['Kin', 'Родственники'], ['Father', 'Отец'],
    ['Grandpa', 'Дедушка'], ['Grandma', 'Бабушка'], ['Mother', 'Мать'], ['Sister', 'Сестра']],
  Fruits: [['Apple', 'Яблоко'], ['Banana', 'Банан'], ['Kiwi', 'Киви'], ['Lemon', 'Лимон'],
    ['Orange', 'Апельсин'], ['Papaya', 'Папайя'], ['Peach', 'Персик'], ['Pear', 'Груша']],
  Vegetables: [['Aubergine', 'Баклажан'], ['Beet', 'Свекла'], ['Cabbage', 'Капуста'], ['Carrot', 'Морковь'],
    ['Corn', 'Кукуруза'], ['Cucumber', 'Огурец'], ['Pepper', 'Перец'], ['Potato', 'Картофель']],
};


export class HiddenMenu {
  constructor() {
    this.hiddenMenu = document.querySelector('.hidden-menu');
    this.main = document.querySelector('.main');
  }

  createList() {
    for (const nameTopic in topicObject) {
      const elList = document.createElement('li');
      document.querySelector('.hidden-menu').append(elList);
      elList.className = nameTopic;

      const link = document.createElement('a');
      elList.append(link);
      link.innerHTML = nameTopic;
    }
  }

  createTopicCardTrain(numberPage) {
    this.hiddenMenu.addEventListener('click', (event) => {
      if (event.target.className === 'hidden-menu' || event.target.className === 'close'
      || event.target.className === 'main-page') return false;

      document.querySelector('main').remove();

      const main = document.createElement('main');
      document.querySelector('.wrapper').append(main);
      main.className = 'main';

      topicObject[event.target.className].map((nameTopic) => {
        localStorage.setItem('nameTopic', `${event.target.className}`);

        const card = document.createElement('div');
        document.querySelector('main').append(card);
        card.className = nameTopic[0];
        card.classList.add('audio');

        const containerImg = document.createElement('div');
        card.append(containerImg);

        const topicImg = document.createElement('img');
        topicImg.src = `./assets/img/cards/${event.target.className}/${nameTopic[0]}.jpg`;
        containerImg.append(topicImg);

        const topicNameEn = document.createElement('div');
        card.append(topicNameEn);
        topicNameEn.className = 'topicNameEn';
        topicNameEn.innerHTML = nameTopic[0];

        const topicNameRu = document.createElement('div');
        card.append(topicNameRu);
        topicNameRu.className = 'topicNameRu';
        topicNameRu.innerHTML = nameTopic[1];

        const refresh = document.createElement('img');
        refresh.src = './assets/img/refresh/refresh.svg';
        topicNameEn.append(refresh);
        refresh.className = 'refresh';
      });
      topics.numberPage = numberPage;

      document.querySelector('.result').innerHTML = '';
    });
  }

  createTopicCardPlay(numberPage) {
    this.hiddenMenu.addEventListener('click', (event) => {
      if (event.target.className === 'hidden-menu' || event.target.className === 'close'
      || event.target.className === 'main-page') return false;

      document.querySelector('main').remove();

      const main = document.createElement('main');
      document.querySelector('.wrapper').append(main);
      main.className = 'main';

      topicObject[event.target.className].map((nameCard) => {
        localStorage.setItem('nameTopic', `${event.target.className}`);

        const card = document.createElement('div');
        document.querySelector('main').append(card);
        card.className = nameCard[0];
        card.id = 'page2';

        const containerImg = document.createElement('div');
        card.append(containerImg);

        const topicImg = document.createElement('img');
        topicImg.src = `./assets/img/cards/${event.target.className}/${nameCard[0]}.jpg`;
        containerImg.append(topicImg);

        topics.numberPage = numberPage;
      });
      const startGame = document.createElement('button');
      document.querySelector('.main').append(startGame);
      startGame.className = 'start-game';
      startGame.innerHTML = 'Start game';

      topicCards.playSound();
    });
  }

  menuMovement() {
    document.body.addEventListener('click', (event) => {
      if (event.target.className === 'burger-menu' || event.target.className === 'hidden-menu') {
        document.querySelector('.hidden-menu').style.left = '0';
      } else {
        document.querySelector('.hidden-menu').style.left = document.querySelector('.hidden-menu').style.width;
      }
      if (event.target.className === 'close') {
        document.querySelector('.hidden-menu').style.left = document.querySelector('.hidden-menu').style.width;
      }
    });
  }

  menuMainPage() {
    document.querySelector('.main-page').addEventListener('click', (event) => {
      topics.createTopic();

      if (document.querySelector('#checkbox').checked === true) {
        document.querySelector('main').id = 'mode-play-main';
        topicCards.createTopicCardsPlay(2);
      } else {
        topicCards.createTopicCardsTrain(2);
      }

      document.querySelector('.result').innerHTML = '';
    });
  }
}

const hiddenMenu = new HiddenMenu();
hiddenMenu.createList();
hiddenMenu.createTopicCardTrain(2);
hiddenMenu.menuMovement();
hiddenMenu.menuMainPage();


export class Topics {
  constructor() {
    this.main = document.querySelector('.main');
    this.numberPage = 1;
  }

  createTopic() {
    document.querySelector('main').remove();

    const main = document.createElement('main');
    document.querySelector('.wrapper').append(main);
    main.className = 'main';

    for (const nameTopic in topicObject) {
      const cardTopic = document.createElement('div');
      document.querySelector('main').append(cardTopic);
      cardTopic.className = nameTopic;

      const containerImg = document.createElement('div');
      cardTopic.append(containerImg);

      const topicImg = document.createElement('img');
      topicImg.src = `./assets/img/cards/Topic/${nameTopic}.jpg`;
      containerImg.append(topicImg);
      topicImg.className = nameTopic;

      const topicName = document.createElement('div');
      cardTopic.append(topicName);
      topicName.innerHTML = nameTopic;
      topicName.className = nameTopic;
    }

    topics.numberPage = 1;
  }
}

const topics = new Topics();
topics.createTopic();


export class TopicCards {
  constructor() {
    this.main = document.querySelector('.main');
    this.refresh = false;
  }

  createTopicCardsTrain(numberPage) {
    document.querySelector('.main').addEventListener('click', (event) => {
      document.querySelector('main').remove();

      const main = document.createElement('main');
      document.querySelector('.wrapper').append(main);
      main.className = 'main';

      topicObject[event.target.className].map((nameCard) => {
        localStorage.setItem('nameTopic', `${event.target.className}`);

        const card = document.createElement('div');
        document.querySelector('main').append(card);
        card.className = nameCard[0];
        card.classList.add('audio');

        const containerImg = document.createElement('div');
        card.append(containerImg);

        const topicImg = document.createElement('img');
        topicImg.src = `./assets/img/cards/${event.target.className}/${nameCard[0]}.jpg`;
        containerImg.append(topicImg);

        const topicNameEn = document.createElement('div');
        card.append(topicNameEn);
        topicNameEn.className = 'topicNameEn';
        topicNameEn.innerHTML = nameCard[0];

        const topicNameRu = document.createElement('div');
        card.append(topicNameRu);
        topicNameRu.className = 'topicNameRu';
        topicNameRu.innerHTML = nameCard[1];

        const refresh = document.createElement('img');
        refresh.src = './assets/img/refresh/refresh.svg';
        topicNameEn.append(refresh);
        refresh.className = 'refresh';
      });

      topics.numberPage = numberPage;
    });
  }

  createTopicCardsPlay(numberPage) {
    document.querySelector('.main').addEventListener('click', (event) => {
      document.querySelector('main').remove();

      const main = document.createElement('main');
      document.querySelector('.wrapper').append(main);
      main.className = 'main';

      topicObject[event.target.className].map((nameCard) => {
        localStorage.setItem('nameTopic', `${event.target.className}`);

        const card = document.createElement('div');
        document.querySelector('main').append(card);
        card.className = nameCard[0];
        card.id = 'page2';

        const containerImg = document.createElement('div');
        card.append(containerImg);

        const topicImg = document.createElement('img');
        topicImg.src = `./assets/img/cards/${event.target.className}/${nameCard[0]}.jpg`;
        containerImg.append(topicImg);

        topics.numberPage = numberPage;
      });

      const startGame = document.createElement('button');
      document.querySelector('.main').append(startGame);
      startGame.className = 'start-game';
      startGame.innerHTML = 'Start game';

      topicCards.playSound();
    });
  }

  createTopicCardsTrainPage2() {
    document.querySelector('main').remove();

    const main = document.createElement('main');
    document.querySelector('.wrapper').append(main);
    main.className = 'main';

    topicObject[localStorage.getItem('nameTopic')].map((nameCard) => {
      const card = document.createElement('div');
      document.querySelector('main').append(card);
      card.className = nameCard[0];
      card.classList.add('audio');

      const containerImg = document.createElement('div');
      card.append(containerImg);

      const topicImg = document.createElement('img');
      topicImg.src = `./assets/img/cards/${localStorage.getItem('nameTopic')}/${nameCard[0]}.jpg`;
      containerImg.append(topicImg);

      const topicNameEn = document.createElement('div');
      card.append(topicNameEn);
      topicNameEn.className = 'topicNameEn';
      topicNameEn.innerHTML = nameCard[0];

      const topicNameRu = document.createElement('div');
      card.append(topicNameRu);
      topicNameRu.className = 'topicNameRu';
      topicNameRu.innerHTML = nameCard[1];

      const refresh = document.createElement('img');
      refresh.src = './assets/img/refresh/refresh.svg';
      topicNameEn.append(refresh);
      refresh.className = 'refresh';
    });
  }

  createTopicCardsPlayPage2() {
    document.querySelector('main').remove();

    const main = document.createElement('main');
    document.querySelector('.wrapper').append(main);
    main.className = 'main';

    topicObject[localStorage.getItem('nameTopic')].map((nameCard) => {
      const card = document.createElement('div');
      document.querySelector('main').append(card);
      card.className = nameCard[0];
      card.id = 'page2';

      const containerImg = document.createElement('div');
      card.append(containerImg);

      const topicImg = document.createElement('img');
      topicImg.src = `./assets/img/cards/${localStorage.getItem('nameTopic')}/${nameCard[0]}.jpg`;
      containerImg.append(topicImg);
    });

    const startGame = document.createElement('button');
    document.querySelector('.main').append(startGame);
    startGame.className = 'start-game';
    startGame.innerHTML = 'Start game';

    this.playSound();
  }

  playSound() {
    function sound(event) {
      document.querySelector('.start-game').remove();
      const repeat = document.createElement('button');
      document.querySelector('.main').append(repeat);
      repeat.className = 'repeat';
      repeat.innerHTML = 'Repeat';

      const array = [];
      let amountTrue = 0;
      let amountFalse = 0;

      topicObject[localStorage.getItem('nameTopic')].map((element) => {
        array.push(element[0]);
      });

      for (let i = array.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }

      const audio = document.createElement('audio');
      const imgYes = document.createElement('img');
      imgYes.src = './assets/img/plus/plus.png';
      const imgNo = document.createElement('img');
      imgNo.src = './assets/img/minus/minus.png';

      let counter = array.length + 1;
      function playSound() {
        counter -= 1;
        if (counter > 0) {
          audio.setAttribute('src', `https://wooordhunt.ru/data/sound/word/us/mp3/${array.pop().toLowerCase()}.mp3`);
          audio.load();
          audio.play();
          audio.addEventListener('ended', click());
        } else if (amountFalse === 0) {
          const win = document.createElement('audio');
          win.setAttribute('src', './assets/sounds/win.mp3');
          win.play();
          document.body.querySelector('header').style.display = 'none';
          document.body.querySelector('.wrapper').style.display = 'none';
          document.body.querySelector('.container-img-win').style.display = 'flex';
          setTimeout(() => {
            document.body.querySelector('header').style.display = 'block';
            document.body.querySelector('.wrapper').style.display = 'block';
            document.body.querySelector('.container-img-win').style.display = 'none';

            document.getElementById('checkbox').checked = 'true';
            topics.createTopic();
            topicCards.createTopicCardsPlay(2);
            document.querySelector('main').id = 'mode-play-main';
            document.querySelector('.result').innerHTML = '';
          }, 3000);
        } else {
          const lose = document.createElement('audio');
          lose.setAttribute('src', './assets/sounds/lose.mp3');
          lose.play();
          document.body.querySelector('header').style.display = 'none';
          document.body.querySelector('.wrapper').style.display = 'none';
          document.body.querySelector('.container-img-lose').style.display = 'flex';
          document.body.querySelector('.amount-errors').innerHTML = `Errors ${amountFalse}`;
          setTimeout(() => {
            document.body.querySelector('header').style.display = 'block';
            document.body.querySelector('.wrapper').style.display = 'block';
            document.body.querySelector('.container-img-lose').style.display = 'none';

            document.getElementById('checkbox').checked = 'true';
            topics.createTopic();
            topicCards.createTopicCardsPlay(2);
            document.querySelector('main').id = 'mode-play-main';
            document.querySelector('.result').innerHTML = '';
          }, 3000);
        }
      }
      playSound();

      function trueOrFalse(event) {
        if (event.path[0].classList[0] !== 'start-game') {
          if (event.path[0].classList[0] === 'repeat') {
            audio.play();
          } else if (`https://wooordhunt.ru/data/sound/word/us/mp3/${event.path[0].classList[0].toLowerCase()}.mp3`
            === audio.src && counter > 0) {
            amountTrue += 1;

            const done = document.createElement('audio');
            done.setAttribute('src', './assets/sounds/true_answer.mp3');
            done.play();

            document.querySelector('.result').append(imgYes.cloneNode(true));
            document.querySelector(`.${event.path[0].classList[0]}`).id = 'plus';

            setTimeout(() => playSound(), 1000);
          } else {
            amountFalse += 1;

            const wrong = document.createElement('audio');
            wrong.src = './assets/sounds/wrong_answer.mp3';
            wrong.play();

            document.querySelector('.result').append(imgNo.cloneNode(true));
          }
        }
      }

      function click() {
        document.querySelector('.main').addEventListener('click', trueOrFalse);
      }
    }
    document.querySelector('.start-game').addEventListener('click', sound, false);
  }

  toggleSwitch() {
    document.querySelector('.toggleSwitch').addEventListener('click', (event) => {
      if (document.querySelector('#checkbox').checked === true && topics.numberPage === 1) {
        topicCards.createTopicCardsPlay(2);
        hiddenMenu.createTopicCardPlay(2);

        document.querySelector('body').className = 'mode-play-body';
        document.querySelector('main').id = 'mode-play-main';
        document.querySelector('.navigation').id = 'mode-play-header';
        document.querySelector('.hidden-menu').id = 'mode-play-side-panel';
      } else if (document.querySelector('#checkbox').checked === false && topics.numberPage === 1) {
        topicCards.createTopicCardsTrain(2);
        hiddenMenu.createTopicCardTrain(2);

        document.querySelector('body').removeAttribute('class');
        document.querySelector('main').removeAttribute('id');
        document.querySelector('.navigation').removeAttribute('id');
        document.querySelector('.hidden-menu').removeAttribute('id');
      } else if (document.querySelector('#checkbox').checked === true && topics.numberPage === 2) {
        topicCards.createTopicCardsPlayPage2();
        hiddenMenu.createTopicCardPlay(2);

        document.querySelector('body').className = 'mode-play-body';
        document.querySelector('main').id = 'mode-play-main';
        document.querySelector('.navigation').id = 'mode-play-header';
        document.querySelector('.hidden-menu').id = 'mode-play-side-panel';
      } else if (document.querySelector('#checkbox').checked === false && topics.numberPage === 2) {
        document.querySelector('.result').innerHTML = '';

        topicCards.createTopicCardsTrainPage2();
        hiddenMenu.createTopicCardTrain(2);

        document.querySelector('body').removeAttribute('class');
        document.querySelector('main').removeAttribute('id');
        document.querySelector('.navigation').removeAttribute('id');
        document.querySelector('.hidden-menu').removeAttribute('id');
      }
    });
  }

  trainingModePlaySound() {
    document.querySelector('.wrapper').addEventListener('click', (event) => {
      if (event.toElement.classList[1] === 'audio' && topicCards.refresh === false) {
        const element = event.path[0].classList[0].toLowerCase();
        const audio = new Audio();
        audio.src = `https://wooordhunt.ru/data/sound/word/us/mp3/${element}.mp3`;
        audio.play();
      } else {
        return false;
      }
    });
  }

  refreshCard() {
    document.querySelector('.wrapper').addEventListener('click', (event) => {
      if (event.target.className === 'refresh') {
        const element = event.path[2].classList[0];
        document.querySelector(`.${element}`).style.transform = 'perspective(500px) rotateY(180deg)';
        document.querySelector(`.${element} .topicNameRu`).style.transition = 'perspective(500px) rotateY(360deg)';
        document.querySelector(`.${element}`).style.zIndex = '0';
        document.querySelector(`.${element} .topicNameRu`).style.zIndex = '1';
        document.querySelector(`.${element}`).style.transition = 'all 0.3s ease-in-out';
        document.querySelector(`.${element} .topicNameRu`).style.transition = 'all 0.3s ease-in-out';
        topicCards.refresh = true;

        document.querySelector(`.${element}`).addEventListener('mouseleave', (event) => {
          if (event.path[1].className === 'main') {
            document.querySelector(`.${element}`).style.transform = 'perspective(500px) rotateY(0deg)';
            document.querySelector(`.${element} .topicNameRu`).style.transition = 'perspective(500px) rotateY(180deg)';
            document.querySelector(`.${element}`).style.zIndex = '1';
            document.querySelector(`.${element} .topicNameRu`).style.zIndex = '0';
            document.querySelector(`.${element}`).style.transition = 'all 0.3s ease-in-out';
            document.querySelector(`.${element} .topicNameRu`).style.transition = 'all 0.3s ease-in-out';
            topicCards.refresh = false;
          }
        });
      } else {
        return false;
      }
    });
  }
}

const topicCards = new TopicCards();
topicCards.createTopicCardsTrain(2);
topicCards.toggleSwitch();
topicCards.trainingModePlaySound();
topicCards.refreshCard();

