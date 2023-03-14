// const { Client } = require('amocrm-js');

// const client = new Client({
//   // логин пользователя в портале, где адрес портала domain.amocrm.ru
//   domain: 'pro100sto.amocrm.ru', // может быть указан полный домен вида domain.amocrm.ru, domain.amocrm.com
//   /*
//     Информация об интеграции (подробности подключения
//     описаны на https://www.amocrm.ru/developers/content/oauth/step-by-step)
//   */
//   auth: {
//     client_id: '847918f1-46a6-4e92-b3a1-be95550f7ec1', // ID интеграции
//     client_secret:
//       'g9UF7JaDbmGgZx72HsRKCCOgzcV52kUd5fwZKfr42MnDzyNrd2tuoCIvE404p4Wt', // Секретный ключ
//     redirect_uri: 'https://8c0b-85-115-248-183.eu.ngrok.io', // Ссылка для перенаправления
//     server: {
//       port: 80,
//     },
//   },
// });

// (async () => {
//   let url = client.auth.getUrl();
//   console.log({ url });
//   const data = await client.request.get('/api/v4/leads');
//   console.log(data);
// })();
const ngrok = require('ngrok');
const { Client } = require('amocrm-js');

const run = async () => {
  const port = 3001;
  const client = new Client({
    domain: 'pro100sto.amocrm.ru',
    auth: {
      client_id: '847918f1-46a6-4e92-b3a1-be95550f7ec1',
      client_secret:
        'g9UF7JaDbmGgZx72HsRKCCOgzcV52kUd5fwZKfr42MnDzyNrd2tuoCIvE404p4Wt',
      server: {
        port,
      },
    },
  });

  console.log('Включаю ngrok...');
  const url = await ngrok.connect(port);
  console.log('Укажите адрес в настройках интеграции AmoCRM:', url);

  client.environment.set('auth.redirect_uri', url);

  const authUrl = client.auth.getUrl();
  console.log('Перейдите по адресу для завершения авторизации', authUrl);

  try {
    const connected = await client.connection.connect();
    console.log('Статус подключения:', connected);
  } catch (e) {
    console.log('Ошибка установления соединения', e);
  }

  console.log('Выключаю ngrok...');
  await ngrok.kill();

  const res = await client.request.get('/api/v4/leads');
  console.log(res);
};

run();
