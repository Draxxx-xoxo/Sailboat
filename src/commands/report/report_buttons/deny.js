const {reportlog} = require('../../../handlers/common_embeds');
const functions = require('../../../handlers/common_functions');

module.exports = {
    run: async (button, report_id, client, member, buttons) => {
            const query = await functions.reportupdate(report_id, button, 'denied');

            const res = (await client.query(query)).rows[0]

            const report_log = await reportlog(res, '🔴')

            button.reply.send(`${member.id} has been warned :ok_hand: User has been notified`);

            button.message.edit({
                embed: report_log,
                buttons: buttons
            })
    }
}