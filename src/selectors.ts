import { E2ESelectors } from '@grafana/e2e-selectors';
export const Components = {
  ConfigEditor: {
    ServerAddress: {
      label: 'Адрес сервера',
      placeholder: 'Server TCP address',
      tooltip: 'ClickHouse native TCP server address',
    },
    ServerPort: {
      label: 'Порт сервера',
      placeholder: (secure: string) => `Typically ${secure === 'true' ? '9440' : '9000'}`,
      tooltip: 'ClickHouse native TCP port. Typically 9000 for unsecure, 9440 for secure',
    },
    Protocol: {
      label: 'Протокол',
      tooltip: 'Native or HTTP for transport',
    },
    Username: {
      label: 'Имя пользователя',
      placeholder: 'Username',
      tooltip: 'ClickHouse username',
    },
    Password: {
      label: 'Пароль',
      placeholder: 'Password',
      tooltip: 'ClickHouse password',
    },
    TLSSkipVerify: {
      label: 'Пропустить TLS Verify',
      tooltip: 'Skip TLS Verify',
    },
    TLSClientAuth: {
      label: 'TLS Client Auth',
      tooltip: 'TLS Client Auth',
    },
    TLSAuthWithCACert: {
      label: 'С CA сертификатом',
      tooltip: 'Needed for verifying self-signed TLS Certs',
    },
    TLSCACert: {
      label: 'CA Cert',
      placeholder: 'CA Cert. Begins with -----BEGIN CERTIFICATE-----',
    },
    TLSClientCert: {
      label: 'Client Cert',
      placeholder: 'Client Cert. Begins with -----BEGIN CERTIFICATE-----',
    },
    TLSClientKey: {
      label: 'Client Key',
      placeholder: 'Client Key. Begins with -----BEGIN RSA PRIVATE KEY-----',
    },
    DefaultDatabase: {
      label: 'Дефолтная БД',
      placeholder: 'Default database',
      tooltip: 'Default database to be used. Can be empty.',
    },
    Timeout: {
      label: 'Тайм-аута присоединения (сек)',
      placeholder: '10',
      tooltip: 'Timeout in seconds for connection',
    },
    QueryTimeout: {
      label: 'Тайм-аут запроса (сек)',
      placeholder: '60',
      tooltip: 'Timeout in seconds for read queries',
    },
    Secure: {
      label: 'Защищенное соединение',
      tooltip: 'Toggle on if the connection is secure',
    },
    Validate: {
      label: 'Валидировать SQL',
      tooltip: 'Validate Sql in the editor.',
    },
    SecureSocksProxy: {
      label: 'Включить Secure Socks Proxy',
      tooltip: 'Enable proxying the datasource connection through the secure socks proxy to a different network.',
    },
  },
  QueryEditor: {
    CodeEditor: {
      input: () => '.monaco-editor textarea',
      container: 'data-testid-code-editor-container',
      Expand: 'data-testid-code-editor-expand-button',
    },
    Format: {
      label: 'Формат',
      tooltip: 'Query Type',
      options: {
        AUTO: 'Авто',
        TABLE: 'Таблица',
        TIME_SERIES: 'Временные серии',
        LOGS: 'Логи',
        TRACE: 'Трэйсы',
      },
    },
    Types: {
      label: 'Тип запроса',
      tooltip: 'Query Type',
      options: {
        SQLEditor: 'SQL Editor',
        QueryBuilder: 'Query Builder',
      },
      switcher: {
        title: 'Вы уверены?',
        body: 'Запросы, слишком сложные для SQL Builder, будут отменены.',
        confirmText: 'Продолжить',
        dismissText: 'Назад',
      },
      cannotConvert: {
        title: 'Отменить конвертацию',
        confirmText: 'Да',
      },
    },
    QueryBuilder: {
      TYPES: {
        label: 'Показать как',
        tooltip: 'Выбрать шаблон построения запроса',
        options: {
          LIST: 'Таблица',
          AGGREGATE: 'Аггрегат',
          TREND: 'Временные серии',
        },
      },
      DATABASE: {
        label: 'База Данных',
        tooltip: 'Clickhouse database to query from',
      },
      FROM: {
        label: 'Таблица',
        tooltip: 'Используемая таблица из БД',
      },
      SELECT: {
        label: 'Поле',
        tooltipTable: 'Список полей для показа',
        tooltipAggregate: `Список полей для отображения. Используйте любую из приведенных агрегаций вместе с полем`,
        ALIAS: {
          label: 'как (AS)',
          tooltip: 'Псевдоним',
        },
        AddLabel: 'Поле',
        RemoveLabel: '',
      },
      AGGREGATES: {
        label: 'Аггрегаты',
        tooltipTable: 'Агрегатные функции для использования',
        tooltipAggregate: `Агрегатные функции для использования`,
        ALIAS: {
          label: 'как (AS)',
          tooltip: 'псевдоним',
        },
        AddLabel: 'Аггрегат',
        RemoveLabel: '',
      },
      WHERE: {
        label: 'Фильтр',
        tooltip: `Список фильтров`,
        AddLabel: 'Фильтр',
        RemoveLabel: '',
      },
      GROUP_BY: {
        label: 'Сгрупировать по',
        tooltip: 'Сгрупировать результаты по заданному полю',
      },
      ORDER_BY: {
        label: 'Упорядочить по',
        tooltip: 'Упорядочить результаты по полю',
        AddLabel: 'Упорядочить по',
        RemoveLabel: '',
      },
      LIMIT: {
        label: 'Лимит',
        tooltip: 'Максимальное количество записей результата для показа.',
      },
      TIME_FIELD: {
        label: 'Поле времени',
        tooltip: 'Выберите поле время для определения тренда с течением времени',
      },
      LOGS_VOLUME_TIME_FIELD: {
        label: 'Поле времени',
        tooltip: 'Выберите поле "Время" для гистограммы объема журналов. Если этот параметр не выбран, гистограмма отображаться не будет',
      },
      LOG_LEVEL_FIELD: {
        label: 'Поле уровней логов',
        tooltip: 'Выберите поле, из которого необходимо извлечь информацию на уровне журнала',
      },
      PREVIEW: {
        label: 'Предпоказ SQL запроса',
        tooltip: 'Здесь показывается пример запроса перед отправкой',
      },
    },
  },
};
export const selectors: { components: E2ESelectors<typeof Components> } = {
  components: Components,
};
