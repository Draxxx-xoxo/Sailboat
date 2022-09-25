function update(){
    var jsonconfig = jsyaml.load(editor.getValue(), 'json');
    const Http = new XMLHttpRequest();
    var guildid = window.location.pathname.split('/');
    const filterURL = `http://localhost:1337/api/configurations?filters[guild_id][$eq]=${guildid[1]}`
    Http.open("Get", filterURL);
    Http.setRequestHeader("Authorization", 'bearer 822ca389f5560fec7410bd387bdac30cf87379d1608de0b400b903549af53bff5942217c08fdf0fc1ecf3f06b681e0684c1c15a7a6dd1c74533524abe31f93bcf0484c0f63861763afa589ba6750879d6c224fa4ad2f3b7787c32fe518ab6115b98bd6b44e1d0fad3f1cd68a5dafa251c0268e815b7e1c057b7573f91198ed61');
    Http.send();
    Http.onload = () => {
    if (Http.readyState === Http.DONE) {
      if (Http.status === 200) {
        var id = JSON.parse(Http.responseText).data[0].id

        const url = `http://localhost:1337/api/configurations/${id}`
        const data = `
        {
          "data": {
            "configuration": ${JSON.stringify(jsonconfig)}
          }
        }
        `
        Http.open("Put", url, true);
        Http.setRequestHeader("Authorization", 'bearer 822ca389f5560fec7410bd387bdac30cf87379d1608de0b400b903549af53bff5942217c08fdf0fc1ecf3f06b681e0684c1c15a7a6dd1c74533524abe31f93bcf0484c0f63861763afa589ba6750879d6c224fa4ad2f3b7787c32fe518ab6115b98bd6b44e1d0fad3f1cd68a5dafa251c0268e815b7e1c057b7573f91198ed61');
        Http.setRequestHeader("Content-type", "application/json");
        Http.send(data);
        
      }
    }
  }; 
  }