# Overview of Configuration File

{% hint style="danger" %}
This has been discontinued for all new setups. Please check out [Broken link](broken-reference "mention") on the updated way.
{% endhint %}

***

* Configuration file is written in yaml and uploded into the bot's database.
* Configuration file is used to set up the bot's settings and plugins.

### Example of Configuartion File

```
  prefix: ';'
  nickname: ''

plugins:
  levels:
    740175943829815307: 100
    770662647209000970: 50
    741495343002288170: 30
    746770833984323676: 20
    774118155387011074: 0

  mute_settings:
    role: '740175943829815307'

  logging:
    channel: '861610169788268544'
    command_logging: false
    infractions_logging: false
    report_logging: true

  censor:
    censor_words: ['ew', 'no']
    whitelist_words: ['sure', 'cool']
    link_filter: true
    invite_filter: true
    ignore_channels: ['756704090532348054']
    ignore_users: ['']

  welcome_channel:
    channel: ''
    join_message: 'Welcome Message Insert lol'
    leave_message: 'Leave Message Insert lol'

  reports:
    report_user: true
    logging_channel: '861610169788268544'
```
