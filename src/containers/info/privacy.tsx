import Head from 'next/head';

import { Container, Box, Typography, ListItemText, List, ListItem } from '@mui/material';

import Button from 'components/Button';
import Header from 'containers/landing/components/Header';
import Footer from 'containers/landing/components/Footer';

import useStyles from './style';

const Privacy = () => {
  const classes = useStyles();

  return (
    <Container>
      <Head>
        <title>Политика в области обработки персональных данных</title>
        <meta property="og:title" content="Политика в области обработки персональных данных" key="title" />
      </Head>
      <Header withoutPadding />
      <Box className={classes.mainBox}>
        <Typography component="h1" className={classes.title}>
          Политика в области обработки персональных данных
        </Typography>

        <Box className={classes.blockPrivacy}>
          <Typography>
            1. Настоящий документ определяет политику ООО «Тэленти» (далее – «Потенциал страны») в отношении обработки
            персональных данных и реализуемых требованиях к защите персональных данных (далее – Политика), разработан во
            исполнение требований пункта 2 части 1 статьи 18.1 Федерального закона от 27.07.2006 № 152-ФЗ «О
            персональных данных» (далее - Закон о персональных данных) в целях обеспечения защиты прав и свобод человека
            и гражданина при обработке его персональных данных, в том числе защиты прав на неприкосновенность частной
            жизни, личную и семейную тайну.
          </Typography>
        </Box>

        <Box className={classes.blockPrivacy}>
          <Typography>
            2. В соответствии с действующим законодательством Российской Федерации ООО «ТЭЛЭНТИ» является оператором
            персональных данных. При организации и осуществлении обработки персональных данных ООО «ТЭЛЭНТИ»
            руководствуется требованиями Федерального закона от 27.07.2006 № 152-ФЗ «О персональных данных» и принятыми
            в соответствии с ним иными нормативными правовыми актами.
          </Typography>
        </Box>

        <Box className={classes.blockPrivacy}>
          <Typography>
            3. Настоящая Политика публикуется в информационно-телекоммуникационной сети «Интернет» на сайте Платформы
            «Потенциал страны», расположенном по адресу доменного имени{' '}
            <a href="https://p-strana.ru">https://p-strana.ru</a>, с возможностью неограниченного доступа к ней по
            адресу <a href=" https://p-strana.ru/privacy"> https://p-strana.ru/privacy</a>.
          </Typography>
        </Box>

        <Box className={classes.blockPrivacy}>
          <Typography>
            4. ООО «ТЭЛЭНТИ» осуществляет обработку персональных данных в рамках выполнения своей основной деятельности
            с использованием Платформы «Потенциал страны», доступ к которой осуществляется через сайт{' '}
            <a href="https://p-strana.ru">https://p-strana.ru</a>. Платформа «Потенциал страны»{' '}
            <a href="https://p-strana.ru">https://p-strana.ru</a> представляет собой совокупность программных и
            аппаратных средств, обеспечивающих информационное и технологическое взаимодействие между соискателями и
            потенциальными работодателями, включает в себя систему тестов и комплексную оценку, которая оказывает
            консультационную помощь в вопросах профориентации и развития карьеры специалистов, при помощи искусственного
            интеллекта платформы рекомендует вакансии, наиболее подходящие из размещенных на Платформе, предоставляет
            рекомендации по саморазвитию, вариантам карьерного пути на основе психологического портрета соискателя.
          </Typography>
        </Box>

        <Box className={classes.blockPrivacy}>
          <Typography>
            5. Платформа «Потенциал страны» собирает и хранит только те персональные данные, которые необходимы для
            регистрации субъекта персональных данных (далее по тексту также – Пользователь) и оказания услуг (исполнения
            соглашений и договоров с Пользователем). Обработка персональных данных включает в себя сбор, запись,
            систематизацию, накопление, хранение, уточнение (обновление, изменение), извлечение, использование, передачу
            (распространение, предоставление, доступ), обезличивание, блокирование, удаление, уничтожение персональных
            данных. Обработка персональных данных осуществляется с использованием средств автоматизации или без
            использования таких средств. Обработка осуществляется безопасным образом, в том числе с применением
            современных методов шифрования (протокол HTTPS и другие).
          </Typography>
        </Box>

        <Box className={classes.blockPrivacy}>
          <Typography>6. Цели сбора и обработки персональных данных Пользователей:</Typography>
          <List className={classes.list}>
            <ListItem>
              <ListItemText>
                - создание Пользователем учётной записи на сайте <a href="https://p-strana.ru">https://p-strana.ru</a>;
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>- определение местоположения Пользователя в определенной геолокации;</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                - идентификация и аутентификация Пользователя Идентификация для авторизации на сайте Платформы
                «Потенциал страны», а также идентификация стороны в рамках соглашений и договоров с ООО «ТЭЛЭНТИ»;
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>- предоставление Пользователю услуг Платформы «Потенциал страны»;</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>- установление контактов между работодателями и соискателями;</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                - определение компетенций, ценностей, знаний и опыта Пользователя для содействия в профориентации и
                трудоустройстве;
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                - взаимодействие с учебными заведениями и работодателями по вопросам повышения эффективности
                трудоустройства выпускников;
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                - установление в случае необходимости с Пользователем обратной связи, в том числе направление
                уведомлений (включая push-уведомлений), запросов и информации, связанных с использованием услуг
                Платформы «Потенциал страны», оказанием услуг, а также обработка запросов и заявок от Пользователя;
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                - подтверждение достоверности и полноты персональных данных Пользователя, предоставленных Пользователем;
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                - предоставление Пользователю эффективной технической поддержки при возникновении проблем, связанных с
                использованием услуг Платформы «Потенциал страны»;
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                - улучшение качества услуг Платформы «Потенциал страны», удобства их использования, разработка новых
                сервисов и услуг;
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                - проведение статистических и иных исследований на основе обезличенных персональных данных;
              </ListItemText>
            </ListItem>
          </List>
        </Box>

        <Box className={classes.blockPrivacy}>
          <Typography>
            7. Субъект персональных данных свободно, своей волей и в своем интересе предоставляет свои персональные
            данные ООО «ТЭЛЭНТИ» для целей заключения и исполнения Пользовательского соглашения, и, регистрируясь на
            сайте <a href="https://p-strana.ru">https://p-strana.ru</a>, дает ООО «ТЭЛЭНТИ» свое согласие на обработку
            персональных данных в объеме, установленном настоящей Политикой, в том числе на распространение своих
            персональных данных в целях обработки, указанных в настоящей Политике, в том числе как с использованием
            средств автоматизации, так и без их использования. Использование Платформы «Потенциал страны», регистрация
            на сайте <a href="https://p-strana.ru">https://p-strana.ru</a>, означает осознанное, добровольное и
            безоговорочное согласие субъекта персональных данных с настоящей Политикой и указанными в ней условиями
            обработки его персональных данных. В случае несогласия с этими условиями субъект персональных данных должен
            воздержаться от использования услуг Платформы «Потенциал страны» и регистрации на сайте{' '}
            <a href="https://p-strana.ru">https://p-strana.ru</a>.
          </Typography>
        </Box>

        <Box className={classes.blockPrivacy}>
          <Typography>
            8. Согласие на обработку персональных данных действует бессрочно и может быть отозвано субъектом
            персональных данных на основании личного заявления в порядке, предусмотренном законом.
          </Typography>
        </Box>

        <Box className={classes.blockPrivacy}>
          <Typography>
            9. Пользователь вправе в любой момент изменить (обновить, дополнить) предоставленные им персональные данные
            или её часть, а также параметры их конфиденциальности, воспользовавшись функцией редактирования персональных
            данных в разделе «Настройки».
          </Typography>
        </Box>

        <Box className={classes.blockPrivacy}>
          <Typography>
            10. Пользователь вправе удалить предоставленные им персональные данные, воспользовавшись функцией «Удалить
            Учётную запись» в разделе «Настройки». При этом удаление учётной записи повлечет невозможность использования
            Платформы «Потенциал страны».
          </Typography>
        </Box>

        <Box className={classes.blockPrivacy}>
          <Typography>
            11. Политика действует в отношении всех персональных данных, относящихся к субъекту персональных данных,
            которые ООО «ТЭЛЭНТИ» может получить в связи с использованием Платформы «Потенциал страны».
          </Typography>
        </Box>

        <Box className={classes.blockPrivacy}>
          <Typography>12. В рамках настоящей Политики под персональными данными понимаются:</Typography>
          <List className={classes.list}>
            <ListItem>
              <ListItemText>
                12.1. любая информация, относящаяся к прямо или косвенно определенному или определяемому физическому
                лицу (субъекту персональных данных), в том числе предоставленные субъектами персональных данных через
                интернет и/или собранные с использованием интернет-сайта Платформы «Потенциал страны», включая но не
                ограничиваясь: фамилия, имя, отчество; гражданство; дата рождения; адрес электронной почты; номера
                контактных телефонов; ссылки на социальные сети и другие сайты; сведения об образованиях; сведения о
                выполняемой работе с начала трудовой деятельности; цифровое фотографическое изображение лица человека,
                позволяющее установить его личность; иные сведения, которые субъект персональных данных пожелал сообщить
                о себе, и/или которые получены в результате использования субъектом персональных данных услуг Платформы
                «Потенциал страны».
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                12.2. Данные, которые автоматически передаются Платформой «Потенциал страны» в процессе их использования
                с помощью установленного на устройстве субъекта персональных данных – пользователя программного
                обеспечения, в том числе данные о его местоположении в определенной геолокации, данные об индивидуальном
                устройстве пользователя (IP-адрес, информация из cookie, уровень заряда батареи устройства, версия и
                название операционной системы устройства, информация о браузере пользователя (или иной программе, с
                помощью которой осуществляется доступ к Платформе «Потенциал страны»), время доступа, адрес
                запрашиваемой Интернет-страницы), другие технологические данные об устройстве.
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                12.3. Иная информация о субъекте персональных данных, сбор и/или предоставление которой необходимо для
                использования услуг Платформы «Потенциал страны».
              </ListItemText>
            </ListItem>
          </List>
        </Box>
        <Box className={classes.blockPrivacy}>
          <Typography>
            13. В целях выполнения обязательств перед субъектами персональных данных в рамках пользовательского
            соглашения ООО «ТЭЛЭНТИ» осуществляет сбор информации следующими способами:
          </Typography>
          <List className={classes.list}>
            <ListItem>
              <ListItemText>
                13.1. Информация предоставляется субъектом персональных данных самостоятельно при использовании услуг
                Платформы «Потенциал страны», сайта <a href="https://p-strana.ru">https://p-strana.ru</a> (фамилия, имя,
                отчество, пол, дата рождения, адрес, семейное положение, гражданство, образование, профессия, описания
                мест работы, адрес электронной почты, номер телефона и любая другая информация, которую субъект
                персональных данных указывает по своему усмотрению);
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                13.2. Информация автоматически передается сайту Платформы «Потенциал страны» в процессе его
                использования с помощью программного обеспечения, установленного на устройстве Пользователя, в т.ч.
                IP-адрес, данные Cookies, сведения о местоположении и перемещении устройства Пользователя, информация о
                браузере, операционной системе, времени доступа, поисковых запросах. Сайт может использовать сторонние
                интернет-сервисы для организации сбора статистических персональных данных, сторонние интернет-сервисы
                обеспечивают хранение полученных данных на собственных серверах. Сайт не несет ответственности за
                локализацию серверов сторонних интернет-сервисов.
              </ListItemText>
            </ListItem>
          </List>
        </Box>

        <Box className={classes.blockPrivacy}>
          <Typography>
            14. ООО «ТЭЛЭНТИ» не осуществляет проверку достоверности предоставляемой субъектами персональных данных
            информации и не осуществляет контроль за их дееспособностью, полагая, что субъекты персональных данных
            предоставляют достоверные и достаточные персональные данные, действуют добросовестно, осмотрительно и
            поддерживают персональные данные в актуальном состоянии. Последствия предоставления недостоверных
            персональных данных определены в Пользовательском соглашении, содержащемся на странице Сайта Платформы
            «Потенциал страны» по адресу <a href="https://p-strana.ru/agreement">https://p-strana.ru/agreement</a>.
          </Typography>
        </Box>

        <Box className={classes.blockPrivacy}>
          <Typography>15. Обработка персональных данных осуществляется на основе принципов:</Typography>
          <List className={classes.list}>
            <ListItem>
              <ListItemText>- законности и справедливости обработки персональных данных;</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                - ограниченности обработки персональных данных Пользователя при достижении конкретных, заранее
                определенных и законных целей, а также уничтожения по достижении заранее определенных и законных целей
                или в случае утраты необходимости в их достижении;
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                - соответствия целей обработки персональных данных Пользователя целям сбора персональных данных
                Пользователя;
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                - совместимости обрабатываемых персональных данных Пользователя с целями обработки персональных данных
                Пользователя;
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                - недопустимости объединения баз данных, содержащих персональные данные Пользователя, обработка которых
                осуществляется в целях, несовместимых между собой;
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>- соответствия персональных данных Пользователя целям их обработки;</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                - соответствия содержания и объема обрабатываемых персональных данных Пользователя заявленным целям
                обработки персональных данных Пользователя;
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                - недопустимости обработки персональных данных Пользователя, избыточных по отношению к заявленным целям
                их обработки;
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                - обеспечения точности персональных данных Пользователя, их достаточности, а в необходимых случаях и
                актуальности по отношению к целям обработки персональных данных Пользователя, а также принятия
                необходимых мер либо обеспечения их принятие по удалению или уточнению неполных или неточных данных;
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                - хранения персональных данных Пользователя в форме, позволяющей определить субъекта персональной данных
                (Пользователя), не дольше, чем этого требуют цели их обработки.
              </ListItemText>
            </ListItem>
          </List>
        </Box>

        <Box className={classes.blockPrivacy}>
          <Typography>
            16. ООО «ТЭЛЭНТИ» вправе передавать персональные данные Пользователя третьим лицам в рамках использования
            Пользователем Платформы «Потенциал страны» либо для оказания услуги Пользователю. При этом обеспечивается
            конфиденциальность персональных данных Пользователя.
          </Typography>
        </Box>

        <Box className={classes.blockPrivacy}>
          <Typography>
            17. ООО «ТЭЛЭНТИ» принимает необходимые организационные и технические меры для защиты персональных данных
            Пользователя от неправомерного или случайного доступа, уничтожения, изменения, блокирования, копирования,
            распространения, а также от иных неправомерных действий третьих лиц.
          </Typography>
        </Box>

        <Box className={classes.blockPrivacy}>
          <Typography>
            18. Обработка персональных данных Пользователя прекращается по истечении срока, предусмотренного законом,
            иным нормативным правовым актом Российской Федерации, настоящей Политикой или в случае отзыва согласия
            субъекта персональных данных на обработку его персональных данных. При отзыве субъектом персональных данных
            согласия на обработку его персональных данных такая обработка осуществляется только в пределах, необходимых
            и предусмотренных нормативными правовыми актами Российской Федерации.
          </Typography>
        </Box>

        <Box className={classes.blockPrivacy}>
          <Typography>
            19. ООО «ТЭЛЭНТИ» не выполняет обработку специальных категорий персональных данных, касающихся расовой,
            национальной принадлежности, политических взглядов, религиозных или философских убеждений, состояния
            здоровья, интимной жизни.
          </Typography>
        </Box>

        <Box className={classes.blockPrivacy}>
          <Typography>
            20. Настоящая Политика распространяется на отношения в области обработки персональных данных, возникшие у
            ООО «ТЭЛЭНТИ», как до, так и после утверждения настоящей Политики.
          </Typography>
        </Box>

        <Box className={classes.blockPrivacy}>
          <Typography>
            21. ООО «ТЭЛЭНТИ» не контролирует и не несет ответственность за сайты третьих лиц, на которые субъект
            персональных данных может перейти по ссылкам, доступным на Сайте Платформы «Потенциал страны», в том числе в
            результатах поиска. На таких сайтах у субъекта персональных данных может собираться или запрашиваться иные
            персональные данные, а также могут совершаться иные действия.
          </Typography>
        </Box>

        <Box className={classes.blockPrivacy}>
          <Typography>
            22. ООО «ТЭЛЭНТИ» принимает необходимые и достаточные организационные и технические меры для защиты
            персональных данных Пользователя от неправомерного или случайного доступа, уничтожения, изменения,
            блокирования, копирования, распространения, а также от иных неправомерных действий с ней третьих лиц.
          </Typography>
        </Box>

        <Box className={classes.blockPrivacy}>
          <Typography>
            23. ООО «ТЭЛЭНТИ» имеет право вносить изменения в настоящую Политику. Новая редакция Политики вступает в
            силу с момента ее размещения, если иное не предусмотрено новой редакцией Политики. Действующая редакция
            всегда находится на странице Сайта Платформы по адресу{' '}
            <a href="https://p-strana.ru/privacy">https://p-strana.ru/privacy</a>.
          </Typography>
        </Box>

        <Box className={classes.blockPrivacy}>
          <Typography>
            24. Все предложения или вопросы по поводу настоящей Политики следует сообщать в ООО «ТЭЛЭНТИ» по адресу{' '}
            <a href="mailto:info@talanty.online">info@talanty.online</a>.{' '}
          </Typography>
        </Box>

        <Box className={classes.block}>
          <Typography component="h3" className={classes.blockTitle}>
            25. Реквизиты ООО «ТЭЛЭНТИ»
          </Typography>
          <List className={classes.contactsList}>
            <ListItem>
              <ListItemText>
                Полное наименование оператора: Общество с ограниченной ответственностью «Тэленти».
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Сокращенное наименование оператора: ООО «Тэленти».</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                Адрес: 196105, Санкт-Петербург, пр. Юрия Гагарина, д. 1, лит А, пом. 24Н, офис 701
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Основной государственный регистрационный номер (ОГРН): 1217800088879</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Электронная почта: info@talanty.online</ListItemText>
            </ListItem>
          </List>
        </Box>
        <Button nextLink linkProps={{ href: '/' }}>
          На главную
        </Button>
      </Box>
      <Footer />
    </Container>
  );
};

export default Privacy;