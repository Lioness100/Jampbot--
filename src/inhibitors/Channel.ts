import { Command, Inhibitor, InhibitorOptions } from 'discord-akairo';
import { Message } from 'discord.js';
import { spamChannels, generalChannels } from '../lib/utils/Constants';
import ApplyOptions from '../lib/utils/ApplyOptions';

@ApplyOptions<InhibitorOptions>('channel', { reason: 'channel' })
export default class Channel extends Inhibitor {
  public exec(message: Message, command: Command): boolean {
    if (command.blockedChannels === 'default')
      command.blockedChannels = spamChannels;
    else if (command.allowedChannels === 'default')
      command.allowedChannels = generalChannels;

    return (
      command.blockedChannels?.includes(message.channel.id) ??
      !(command.allowedChannels?.includes(message.channel.id) ?? true)
    );
  }
}
