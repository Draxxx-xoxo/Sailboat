# Configuration File Guide

## How to Create a Configuartion File
- Create a yml with your guild_id `4240283492849284.yml`
- Add the file under Backend/configuation_files

## Setting up of Configuartion File 

### Example of Configuartion File

```guild_settings:
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

## Legend
### Guild Settings 
|Option   |Description   |Type   |Default   |
|---|---|---|---|
|Prefix  |Add a Prefix for your bot   |   |False   |
|Nickname   |Add a nickname to the bot   |   |False   |

### Plugins
|Option   |Description   |Type   |Default   |
|---|---|---|---|
|Levels  |Add roles level for moderation commands  |   |False   |
|Nickname   |Add a nickname to the bot   |   |False   |

#### Levels
``` 
levels:
    740175943829815307: 100 #Admin  
    770662647209000970: 50 #Moderator
    741495343002288170: 30  #Trusted  
    746770833984323676: 20  #Truested
    774118155387011074: 0 #Default
 ```
 
This is where you assign levels to each role! Remember, the default level is 0 if a user doesn't have one of the listed roles. Users will have the highest level of the roles they're assigned.

By default, each level has a certain rank associated with it: 0 - Default, 10 - Trusted, 50 - Mod, 100 - Admin. You can view the default rank required for each command by looking at the Commands section for the plugin.
