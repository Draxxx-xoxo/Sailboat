module.exports = {
    async getPreix(fs, yaml){
        const doc = yaml.load(fs.readFileSync('./configuation_files/guild.yml', 'utf8'));
        return doc.guild_settings.prefix
        
    },
}