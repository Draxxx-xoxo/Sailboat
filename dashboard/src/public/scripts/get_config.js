const currentURL = window.location.href
var guildid = window.location.pathname.split('/');
const Http = new XMLHttpRequest();
const url = `http://localhost:1337/api/configurations?filters[guild_id][$eq]=${guildid[1]}`
Http.open("Get", url);
Http.setRequestHeader("Authorization", 'bearer 822ca389f5560fec7410bd387bdac30cf87379d1608de0b400b903549af53bff5942217c08fdf0fc1ecf3f06b681e0684c1c15a7a6dd1c74533524abe31f93bcf0484c0f63861763afa589ba6750879d6c224fa4ad2f3b7787c32fe518ab6115b98bd6b44e1d0fad3f1cd68a5dafa251c0268e815b7e1c057b7573f91198ed61');
Http.send();
var editor = ace.edit("editor");
Http.onload = () => {
  if (Http.readyState === Http.DONE) {
    if (Http.status === 200) {
      var response = JSON.parse(Http.responseText);
      console.log(response)
      var rawconfig = response.data[0].attributes.configuration
      //var editor = ace.edit("editor");
      if(rawconfig == null) rawconfig = {welcome: "Hello there! To get started please read our docs"}
      var yamlconfig = jsyaml.dump(rawconfig, {noArrayIndent: true});
      editor.setValue(yamlconfig);
      editor.setTheme("ace/theme/twilight");
      editor.session.setMode("ace/mode/yaml");
    }
  }
}; 