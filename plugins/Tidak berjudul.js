if (!user.character) user.character = {};
                if (!('name' in user.character)) user.character.name = '';
				if (!isNumber(user.character.level)) user.character.level = 0
				if (!('rarity' in user.character)) user.character.followers = []
				if (!isNumber(user.character.charactersDestroyed))user.character.charactersDestroyed = 0			
				if (!isNumber(user.character.followersDestroyed)) user.character.followersDestroyed = 0
				if (!('alliances' in user.character)) user.character.alliances = ''