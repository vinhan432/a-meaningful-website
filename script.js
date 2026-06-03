/* ============================================================
   Being Enough — vanilla JS, no build step
   Architecture:
     1. Embedded data (I18N, HELPLINES, WHISPERS)
     2. State + persistence (localStorage)
     3. Theme + locale + ambient
     4. Modules: greeting, mood, oasis (tea/plant/lamp),
                 garden, sky, bubbles, helplines, profile
   ============================================================ */

(function () {
  'use strict';

  /* =========================================================
     1. EMBEDDED DATA
     ========================================================= */

  // ----- 1a. I18N -----
  const I18N = {
    en: {
      'cover.kicker':     'a small quiet place',
      'cover.title.l1':   'You are',
      'cover.title.l2':   'already enough.',
      'cover.sub':        "No score. No streak. No judgment. Sit down with me for a few minutes.",
      'cover.nameLabel':  'What should I call you?',
      'cover.namePh':     'a name, or leave blank',
      'cover.begin':      'begin softly',
      'cover.skip':       'skip',
      'cover.note':       'This stays on your device. No account. No cloud. You can clear it any time.',

      'greet.eyebrow':    'checking in',
      'greet.fresh':      'Welcome. I am glad you came in.',
      'greet.fresh.named': 'Welcome, {name}. I am glad you came in.',
      'greet.returning':  'You came back. I am still here, and so are you.',
      'greet.returning.named': 'You came back, {name}. I am still here, and so are you.',
      'greet.checking':   'Welcome back. I remembered that not long ago, you felt something heavy. You do not have to perform being okay for me. How does your chest feel right now? Just sit down here with me.',
      'greet.checking.named': 'Welcome back, {name}. I remembered that not long ago, you felt something heavy. You do not have to perform being okay for me. How does your chest feel right now? Just sit down here with me.',
      'greet.invite':     "You don't have to share anything. But if you'd like, name the weather inside you. Just one word is enough.",

      'mood.label':       'How is the weather inside?',
      'mood.heavy':       'heavy',
      'mood.scattered':   'scattered',
      'mood.soft':        'soft',
      'mood.tender':      'tender',
      'mood.quiet':       'quiet',
      'mood.noteLabel':   'A small note (optional, 140 characters)',
      'mood.notePh':      'say it in a whisper...',
      'mood.save':        'save & rest',
      'mood.cancel':      'not now',
      'mood.ack':         'Thank you for telling me. I will remember — gently.',

      'oasis.eyebrow':    'a quiet corner',
      'oasis.title.l1':   'The Still Hand',
      'oasis.title.l2':   'Oasis',
      'oasis.sub':        'Care for something small. Watch the light change. Let your hands remember they can do gentle things.',
      'oasis.tea.label':  'a quiet cup',
      'oasis.tea.btn':    'brew tea',
      'oasis.tea.brewed': 'brewed. rest a moment.',
      'oasis.plant.label':'desk plant',
      'oasis.plant.btn':  'water it',
      'oasis.plant.watered': 'watered. it grew a little.',
      'oasis.lamp.label': 'desk lamp',
      'oasis.lamp.btn':   'toggle',

      'garden.eyebrow':   'plant a worry',
      'garden.title.l1':  'Word',
      'garden.title.l2':  'Garden',
      'garden.sub':       'Type a worry. It becomes a slow branch. You do not have to look after it. It will rest here.',
      'garden.label':     'A worry (or a thought)',
      'garden.ph':        "what's sitting on your chest...",
      'garden.plant':     'plant it',
      'garden.footer':    'Branches grow slowly. Sit with one. There is no rush.',

      'sky.eyebrow':      'place a star',
      'sky.title.l1':     'Constellation',
      'sky.title.l2':     'Sky',
      'sky.sub':          'Tap the dark. Place a star. They will reach toward each other. The sky is allowed to sing — only when you ask it to.',
      'sky.letSing':      'let the sky sing',
      'sky.silenced':     'the sky is quiet now',
      'sky.clear':        'clear my stars',
      'sky.release':      'release this star',

      'help.eyebrow':     'if you need a real voice',
      'help.title.l1':    'Someone',
      'help.title.l2':    'is there',
      'help.sub':         'These are real people who pick up. We do not put phone numbers into links — you dial them yourself, when you decide. That is your hand to hold first.',
      'help.vn':          'Vietnam',
      'help.global':      'Find a helpline, anywhere',
      'help.searchPh':    'a country or a word...',
      'help.searchHint':  'type to filter',
      'help.globalSrc':   'Sourced from open directories. Numbers are shown for you to dial.',
      'help.community':   'Community & peer projects',
      'help.tag.emergency':  'emergency',
      'help.tag.depression': 'suicide / depression',
      'help.tag.facility':   'facility',
      'help.tag.child':      'children',
      'help.tag.gbv':        'gender-based violence',
      'help.tag.community':  'community',

      'foot.kicker':      'this space is yours',
      'foot.line1':       'You can come back any time.',
      'foot.line2':       'Nothing here is recorded anywhere but here.',
      'foot.reread':      're-read the note from a friend',
      'foot.export':      'save a copy of this space',
      'foot.import':      'bring a copy back in',
      'foot.reset':       'let it go (reset everything)',
      'foot.credit':      'Made with care. No cookies. No trackers. No backend. Made for slow, ordinary hard days.',

      'note.kicker':      'a note from a friend',
      'note.title':       'Hello, dear one.',
      'note.p1':          'This little space was not built to fix you. You are not a thing that needs fixing.',
      'note.p2':          'It is built to keep you company for a few minutes. A cup of tea, a slow branch, a star you can place on a dark night.',
      'note.p3':          'If you are in real danger, or you might hurt yourself, please talk to a real human. There are numbers a few scrolls below. They pick up. They have heard it all before. You will not be a burden.',
      'note.p4':          'I am only a small page. But I am glad you are here.',
      'note.close':       'thank you, sit me down',

      'reset.confirm':    'Are you sure? This will gently let go of everything you have stored here.',
      'reset.done':       'Cleared. You are starting fresh. Be gentle with yourself.',
      'import.ok':        'Brought back in. Welcome home.',
      'import.fail':      "That file doesn't look right. Try another one?",
      'export.fail':      "I couldn't save the file. Try again?",

      // Breathing
      'breath.eyebrow':    'a small breath practice',
      'breath.title.l1':   'Breathe',
      'breath.title.l2':   'with me',
      'breath.sub':        'A short, simple breath. No special technique. Just a small rest for your chest.',
      'breath.start':      'begin',
      'breath.stop':       'rest',
      'breath.cycles':     'cycles so far',
      'breath.in':         'breathe in',
      'breath.hold':       'hold',
      'breath.out':        'breathe out',
      'breath.rest':       'rest',
      'breath.done':       'Well done. Notice how your chest feels. Even a tiny bit different is enough.',
      'breath.presetLabel':'preset',
      'breath.resetLabel': 'reset',
      'breath.notRunning': 'Not running.',
      'breath.cycleLabel': 'cycle',
      'breath.phaseLabel': 'phase',
      'breath.disclaimer': 'If you feel dizzy or uncomfortable, stop. Your nervous system deserves gentleness.',

      // Grounding 5-4-3-2-1
      'ground.eyebrow':    'come back to the room',
      'ground.title.l1':   'Five, four, three,',
      'ground.title.l2':   'two, one',
      'ground.sub':        'A gentle way to remember you are here. Tap each sense when you have found one.',
      'ground.5':          '5 things you can see',
      'ground.4':          '4 things you can touch',
      'ground.3':          '3 things you can hear',
      'ground.2':          '2 things you can smell',
      'ground.1':          '1 thing you can taste',
      'ground.ph':         'name it softly...',
      'ground.done':       'You are here. That is the whole point.',
      'ground.stepLabel':  'step',
      'ground.next':       'next gently',
      'ground.resetLabel': 'start over',

      // Safety modal
      'safety.kicker':     'safety',
      'safety.title':      'You deserve real help.',
      'safety.copy':       'If you might hurt yourself, or you feel in immediate danger, please talk to a real person right now.',
      'safety.subcopy':    'This page stays offline and does not place phone links. Numbers are shown for you to dial.',
      'safety.options':    'Suggested options for your area:',
      'safety.danger':     'If you are in danger right now, prioritize emergency services or someone near you.',
      'safety.continue':   'stay with me',
      'safety.dismiss':    'dismiss',

      // Mini-games
      'mini.eyebrow':     'small play, soft focus',
      'mini.title.l1':    'No-score',
      'mini.title.l2':    'mini-games',
      'mini.sub':         'Touch slowly. Breathe while it happens. Nothing here is measured — only your attention.',

      // Tap mini-game
      'tap.eyebrow':      'a gentle rhythm',
      'tap.title':        'Quiet Tap',
      'tap.sub':          'Tap the "flower" when it opens. No streak. Just timing.',
      'tap.statusLabel': 'status',
      'tap.status.idle':  'waiting...',
      'tap.status.on':    'tap to start',
      'tap.start':        'start gently',
      'tap.reset':        'reset',
      'tap.hint':         'Tip:',
      'tap.hint2':        'slow taps are the right taps.',

      // Wind mini-game
      'wind.eyebrow':     'a moving quiet',
      'wind.title':       'Paper Wind',
      'wind.sub':         'Move your pointer and watch soft paper pieces drift.',
      'wind.statusLabel':'status',
      'wind.status.on':  'ready',
      'wind.pause':       'pause motion',
      'wind.clear':       'clear pieces',
      'wind.hint':        'Hint:',
      'wind.hint2':       'hover gently; let the drift do the work.',
      'wind.paused':      'paused.',
      'wind.resume':      'resume',

      // Tap feedback
      'tap.success':      'you touched the bloom.',
      'tap.touched':      'you touched.',

      // Sky
      'sky.confirm':      'Let go of your stars?',

      // Floating help
      'help.float':      'I need a real person',
      'help.noMatch':     'no matches. try a different word.'
    },

    vi: {
      'cover.kicker':     'một nơi nhỏ và yên tĩnh',
      'cover.title.l1':   'Bạn đã',
      'cover.title.l2':   'đủ rồi.',
      'cover.sub':        'Không điểm số. Không chuỗi ngày. Không phán xét. Ngồi xuống đây với mình vài phút nhé.',
      'cover.nameLabel':  'Mình gọi bạn là gì nhỉ?',
      'cover.namePh':     'một cái tên, hoặc bỏ trống cũng được',
      'cover.begin':      'bắt đầu nhẹ nhàng',
      'cover.skip':       'bỏ qua',
      'cover.note':       'Mọi thứ chỉ ở trên thiết bị của bạn. Không tài khoản. Không mây. Bạn có thể xoá bất cứ lúc nào.',

      'greet.eyebrow':    'hỏi thăm',
      'greet.fresh':      'Chào bạn. Mình vui vì bạn đã vào đây.',
      'greet.fresh.named':'Chào {name}. Mình vui vì bạn đã vào đây.',
      'greet.returning':  'Bạn đã quay lại. Mình vẫn ở đây, và bạn cũng vậy.',
      'greet.returning.named': 'Bạn đã quay lại rồi, {name}. Mình vẫn ở đây, và bạn cũng vậy.',
      'greet.checking':   'Chào bạn quay lại. Mình nhớ hôm trước bạn kể là ngực hơi nặng. Bạn không cần phải gắng gượng là ổn với mình đâu. Lúc này trong lòng bạn thế nào? Cứ ngồi xuống đây với mình.',
      'greet.checking.named': 'Chào {name} quay lại. Mình nhớ hôm trước bạn kể là ngực hơi nặng. Bạn không cần phải gắng gượng là ổn với mình đâu. Lúc này trong lòng bạn thế nào? Cứ ngồi xuống đây với mình.',
      'greet.invite':     'Bạn không cần kể gì đâu. Nhưng nếu muốn, hãy đặt một từ cho thời tiết bên trong bạn. Một từ thôi cũng đủ.',

      'mood.label':       'Thời tiết bên trong bạn thế nào?',
      'mood.heavy':       'nặng',
      'mood.scattered':   'rối bời',
      'mood.soft':        'dịu',
      'mood.tender':      'mong manh',
      'mood.quiet':       'tĩnh lặng',
      'mood.noteLabel':   'Vài lời nhỏ (không bắt buộc, 140 chữ)',
      'mood.notePh':      'kể thì thầm đi...',
      'mood.save':        'lưu & nghỉ',
      'mood.cancel':      'để sau',
      'mood.ack':         'Cảm ơn bạn đã nói với mình. Mình sẽ nhớ — nhẹ nhàng thôi.',

      'oasis.eyebrow':    'một góc yên tĩnh',
      'oasis.title.l1':   'Góc',
      'oasis.title.l2':   'Bàn Tay Yên',
      'oasis.sub':        'Chăm một thứ nhỏ xíu. Nhìn ánh sáng đổi. Để bàn tay bạn nhớ rằng mình vẫn làm được những điều dịu dàng.',
      'oasis.tea.label':  'một tách trà',
      'oasis.tea.btn':    'pha trà',
      'oasis.tea.brewed': 'đã pha. nghỉ một chút nhé.',
      'oasis.plant.label':'cây để bàn',
      'oasis.plant.btn':  'tưới nước',
      'oasis.plant.watered': 'đã tưới. cây lớn thêm một chút.',
      'oasis.lamp.label': 'đèn bàn',
      'oasis.lamp.btn':   'bật/tắt',

      'garden.eyebrow':   'trồng một lo lắng',
      'garden.title.l1':  'Vườn',
      'garden.title.l2':  'Từ Ngữ',
      'garden.sub':       'Gõ một điều lo. Nó sẽ thành một cành chậm rãi. Bạn không cần chăm nó đâu. Nó sẽ nằm đây thôi.',
      'garden.label':     'Một điều lo (hoặc một ý nghĩ)',
      'garden.ph':        'điều gì đang đè trên ngực bạn...',
      'garden.plant':     'trồng nó',
      'garden.footer':    'Cành mọc chậm thôi. Ngồi ngắm một cành. Đừng vội.',

      'sky.eyebrow':      'đặt một ngôi sao',
      'sky.title.l1':     'Bầu Trời',
      'sky.title.l2':     'Chòm Sao',
      'sky.sub':          'Chạm vào bóng tối. Đặt một ngôi sao. Chúng sẽ với tìm nhau. Bầu trời chỉ hát khi bạn cho phép thôi.',
      'sky.letSing':      'cho bầu trời hát',
      'sky.silenced':     'bầu trời đang im lặng',
      'sky.clear':        'xoá các sao của mình',
      'sky.release':      'buông ngôi sao này',

      'help.eyebrow':     'nếu bạn cần một giọng thật',
      'help.title.l1':    'Có',
      'help.title.l2':    'người ở đó',
      'help.sub':         'Đây là những người thật, họ nghe máy. Mình không gài số điện thoại vào đường link — bạn tự bấm, khi bạn sẵn sàng. Bàn tay bạn nắm trước đã.',
      'help.vn':          'Việt Nam',
      'help.global':      'Tìm đường dây hỗ trợ, ở bất kỳ đâu',
      'help.searchPh':    'một nước hoặc một từ...',
      'help.searchHint':  'gõ để lọc',
      'help.globalSrc':   'Lấy từ các thư mục mở. Số để bạn tự bấm.',
      'help.community':   'Cộng đồng & dự án đồng đẳng',
      'help.tag.emergency':  'khẩn cấp',
      'help.tag.depression': 'tự tử / trầm cảm',
      'help.tag.facility':   'cơ sở y tế',
      'help.tag.child':      'trẻ em',
      'help.tag.gbv':        'bạo lực giới',
      'help.tag.community':  'cộng đồng',

      'foot.kicker':      'không gian này là của bạn',
      'foot.line1':       'Bạn có thể quay lại bất cứ lúc nào.',
      'foot.line2':       'Không gì ở đây được ghi ở đâu khác ngoài đây.',
      'foot.reread':      'đọc lại lời nhắn từ một người bạn',
      'foot.export':      'lưu một bản sao của không gian này',
      'foot.import':      'mang một bản sao vào lại',
      'foot.reset':       'buông (xoá tất cả)',
      'foot.credit':      'Làm với sự chăm chút. Không cookie. Không theo dõi. Không backend. Làm cho những ngày bình thường và khó.',

      'note.kicker':      'lời nhắn từ một người bạn',
      'note.title':       'Chào bạn thân mến.',
      'note.p1':          'Góc nhỏ này không được dựng lên để sửa bạn. Bạn không phải thứ cần được sửa.',
      'note.p2':          'Nó chỉ để ngồi cùng bạn vài phút. Một tách trà, một cành chậm, một ngôi sao bạn có thể đặt lên đêm tối.',
      'note.p3':          'Nếu bạn đang thật sự nguy hiểm, hoặc có ý định tự làm tổn thương mình, hãy nói chuyện với một người thật. Có những số máy ở phía dưới. Họ nghe. Họ đã nghe đủ thứ rồi. Bạn sẽ không phải gánh nặng đâu.',
      'note.p4':          'Mình chỉ là một trang nhỏ. Nhưng mình vui vì bạn ở đây.',
      'note.close':       'cảm ơn, ngồi xuống đây nhé',

      'reset.confirm':    'Bạn chắc chứ? Mình sẽ nhẹ nhàng buông mọi thứ bạn đã gửi gắm ở đây.',
      'reset.done':       'Đã xoá. Bạn bắt đầu lại. Hãy dịu dàng với mình nhé.',
      'import.ok':        'Đã mang vào lại. Chào mừng về nhà.',
      'import.fail':      'Tệp này trông không đúng. Thử tệp khác nhé?',
      'export.fail':      'Mình chưa lưu được tệp. Thử lại nhé?',

      // Breathing
      'breath.eyebrow':    'một khoảng thở nhỏ',
      'breath.title.l1':   'Thở',
      'breath.title.l2':   'cùng mình',
      'breath.sub':        'Một hơi thở ngắn và đơn giản. Không cần kỹ thuật gì đâu. Chỉ là cho lồng ngực nghỉ một chút.',
      'breath.start':      'bắt đầu',
      'breath.stop':       'nghỉ',
      'breath.cycles':     'vòng đã thở',
      'breath.in':         'hít vào',
      'breath.hold':       'giữ',
      'breath.out':        'thở ra',
      'breath.rest':       'nghỉ',
      'breath.done':       'Bạn đã làm được. Để ý xem lồng ngực bây giờ thế nào. Dù chỉ khác đi một chút thôi cũng đủ rồi.',
      'breath.presetLabel':'nhịp',
      'breath.resetLabel': 'làm lại',
      'breath.notRunning': 'Chưa bắt đầu.',
      'breath.cycleLabel': 'vòng',
      'breath.phaseLabel': 'phần',
      'breath.disclaimer': 'Nếu thấy chóng mặt hoặc khó chịu, hãy dừng lại. Hệ thần thần kinh của bạn xứng đáng được dịu dàng.',

      // Grounding
      'ground.eyebrow':    'quay lại căn phòng',
      'ground.title.l1':   'Năm, bốn, ba,',
      'ground.title.l2':   'hai, một',
      'ground.sub':        'Một cách nhẹ nhàng để nhớ rằng bạn đang ở đây. Chạm mỗi giác quan khi bạn đã tìm được một thứ.',
      'ground.5':          'Tìm 5 thứ bạn nhìn thấy',
      'ground.4':          'Tìm 4 thứ bạn chạm được',
      'ground.3':          'Tìm 3 thứ bạn nghe được',
      'ground.2':          'Tìm 2 thứ bạn ngửi được',
      'ground.1':          'Tìm 1 thứ bạn nếm được',
      'ground.ph':         'gọi tên nó thật khẽ...',
      'ground.done':       'Bạn đang ở đây. Vậy là đủ rồi.',
      'ground.stepLabel':  'bước',
      'ground.next':       'tiếp theo',
      'ground.resetLabel': 'bắt đầu lại',

      // Safety modal
      'safety.kicker':     'an toàn',
      'safety.title':      'Bạn xứng đáng được giúp đỡ thật sự.',
      'safety.copy':       'Nếu bạn có thể tự làm tổn thương mình, hoặc cảm thấy nguy hiểm ngay lúc này, hãy nói chuyện với một người thật ngay bây giờ.',
      'safety.subcopy':    'Trang này hoạt động ngoại tuyến và không đặt đường link gọi điện. Số điện thoại hiển thị để bạn tự bấm.',
      'safety.options':    'Gợi ý cho khu vực của bạn:',
      'safety.danger':     'Nếu bạn đang nguy hiểm ngay lúc này, hãy ưu tiên dịch vụ khẩn cấp hoặc ai đó gần bạn.',
      'safety.continue':   'ở lại với mình',
      'safety.dismiss':    'đóng lại',

      // Mini-games
      'mini.eyebrow':     'chơi nhẹ, nhìn dịu',
      'mini.title.l1':    'Không điểm',
      'mini.title.l2':    'trò chơi nhỏ',
      'mini.sub':         'Chạm chậm thôi. Thở khi điều đó xảy ra. Không có gì ở đây được tính — chỉ sự chú ý của bạn thôi.',

      // Tap mini-game
      'tap.eyebrow':      'một nhịp đều',
      'tap.title':       'Gõ Nhẹ',
      'tap.sub':         'Gõ vào "bông hoa" khi nó nở. Không có chuỗi. Chỉ là nhịp thôi.',
      'tap.statusLabel': 'trạng thái',
      'tap.status.idle': 'đang chờ...',
      'tap.status.on':   'gõ để bắt đầu',
      'tap.start':       'bắt đầu nhẹ nhàng',
      'tap.reset':       'làm lại',
      'tap.hint':        'Mẹo:',
      'tap.hint2':       'những cú gõ chậm mới là cú đúng.',

      // Wind mini-game
      'wind.eyebrow':     'sự tĩnh lặng chuyển động',
      'wind.title':       'Gió Giấy',
      'wind.sub':         'Di chuyển con trỏ và xem những mảnh giấy mềm trôi nhẹ.',
      'wind.statusLabel':'trạng thái',
      'wind.status.on':  'sẵn sàng',
      'wind.pause':       'tạm dừng',
      'wind.clear':       'xóa mảnh',
      'wind.hint':        'Gợi ý:',
      'wind.hint2':       'di nhẹ thôi; để những mảnh giấy tự trôi.',
      'wind.paused':      'đang tạm dừng.',
      'wind.resume':      'tiếp tục',

      // Tap feedback
      'tap.success':      'đã chạm đúng nhịp.',
      'tap.touched':      'đã chạm.',

      // Sky
      'sky.confirm':      'Buông các ngôi sao của bạn?',

      // Floating help
      'help.float':        'mình cần một người thật',
      'help.noMatch':      'không tìm thấy. thử một từ khác nhé.'
    }
  };

  // ----- 1b. HELPLINES -----
  // Numbers are shown as text only. No tel: links by design.
  const HELPLINES = {
    vietnam: [
      { cat: 'emergency',  name: 'Công an',                  tel: '113',          hours: '24/7', desc_en: 'Police',                                desc_vi: 'Công an' },
      { cat: 'emergency',  name: 'Cấp cứu y tế',             tel: '115',          hours: '24/7', desc_en: 'Medical emergency',                     desc_vi: 'Cấp cứu y tế' },
      { cat: 'emergency',  name: 'Cứu hỏa / Cứu nạn',        tel: '112',          hours: '24/7', desc_en: 'Fire & rescue',                          desc_vi: 'Cứu hỏa / Cứu nạn' },
      { cat: 'depression', name: 'Đường dây Ngày Mai',        tel: '096 306 1414', hours: '24/7', desc_en: 'Suicide & depression support (Vietnamese)', desc_vi: 'Hỗ trợ tự tử & trầm cảm (tiếng Việt)' },
      { cat: 'depression', name: 'Đường dây Hy Vọng',        tel: '0865 044 400', hours: '24/7', desc_en: 'Hope line (Vietnamese)',                  desc_vi: 'Đường dây Hy Vọng (tiếng Việt)' },
      { cat: 'facility',   name: 'Bạch Mai — Khoa Tâm thần',  tel: '024 3869 3731', hours: 'giờ hành chính', desc_en: 'Bach Mai Hospital — Psychiatry (Hanoi)',  desc_vi: 'Bệnh viện Bạch Mai — Khoa Tâm thần (Hà Nội)' },
      { cat: 'facility',   name: 'BV Tâm thần TP. Hồ Chí Minh', tel: '028 3922 6204', hours: 'giờ hành chính', desc_en: 'HCMC Mental Health Hospital',  desc_vi: 'Bệnh viện Tâm thần TP. HCM' },
      { cat: 'child',      name: 'Tổng đài 111',              tel: '111',          hours: '24/7', desc_en: 'Child protection hotline',                desc_vi: 'Tổng đài bảo vệ trẻ em' },
      { cat: 'child',      name: 'Ngôi nhà Bình yên',         tel: '1900 969 680', hours: '24/7', desc_en: 'Child & family support',                  desc_vi: 'Hỗ trợ trẻ em & gia đình' },
      { cat: 'gbv',        name: 'CSAGA',                     tel: '024 3333 5599', hours: 'giờ hành chính', desc_en: 'Gender-based violence (Hanoi-based, Viet/Eng)', desc_vi: 'Bạo lực giới (Hà Nội, Việt/Anh)' }
    ],
    global: [
      { country: 'US',           name: '988 Suicide & Crisis Lifeline',    tel: '988',                 langs: ['en','es'], hours: '24/7' },
      { country: 'UK',           name: 'Samaritans',                       tel: '116 123',             langs: ['en'],     hours: '24/7' },
      { country: 'Canada',       name: '9-8-8 Suicide Crisis Helpline',    tel: '988',                 langs: ['en','fr'],hours: '24/7' },
      { country: 'Australia',    name: 'Lifeline',                         tel: '13 11 14',            langs: ['en'],     hours: '24/7' },
      { country: 'New Zealand',  name: '1737 — need to talk?',             tel: '1737',                langs: ['en'],     hours: '24/7' },
      { country: 'Ireland',      name: 'Samaritans Ireland',               tel: '116 123',             langs: ['en'],     hours: '24/7' },
      { country: 'Germany',      name: 'Telefonseelsorge',                 tel: '0800 111 0 111',      langs: ['de'],     hours: '24/7' },
      { country: 'France',       name: '3114 — National Prevention',       tel: '3114',                langs: ['fr'],     hours: '24/7' },
      { country: 'Spain',        name: 'Teléfono de la Esperanza',         tel: '717 003 717',         langs: ['es'],     hours: '24/7' },
      { country: 'Italy',        name: 'Telefono Amico',                   tel: '02 2327 2327',        langs: ['it'],     hours: '24/7' },
      { country: 'Netherlands',  name: 'De Luisterlijn',                   tel: '0900 0113',           langs: ['nl'],     hours: '24/7' },
      { country: 'Sweden',       name: 'Mind Självmordslinjen',           tel: '90101',               langs: ['sv'],     hours: '24/7' },
      { country: 'Japan',        name: 'TELL Lifeline (Tokyo)',            tel: '03 5774 0992',        langs: ['en','ja'],hours: '9–23' },
      { country: 'South Korea',  name: 'Suicide Prevention (Korea)',       tel: '1393',                langs: ['ko'],     hours: '24/7' },
      { country: 'China',        name: 'Beijing Suicide Prevention',       tel: '010 8295 1332',       langs: ['zh','en'],hours: '24/7' },
      { country: 'Hong Kong',    name: 'The Samaritans (multi-lingual)',   tel: '2896 0000',           langs: ['zh','en'],hours: '24/7' },
      { country: 'Taiwan',       name: '1925 Lifeline',                    tel: '1925',                langs: ['zh'],     hours: '24/7' },
      { country: 'Singapore',    name: 'Samaritans of Singapore',          tel: '1 767',               langs: ['en'],     hours: '24/7' },
      { country: 'Malaysia',     name: 'Befrienders KL',                   tel: '03 7956 8145',        langs: ['en'],     hours: '24/7' },
      { country: 'India',        name: 'iCall',                            tel: '9152987821',          langs: ['en','hi'],hours: 'Mon–Sat' },
      { country: 'Thailand',     name: 'Department of Mental Health',      tel: '1323',                langs: ['th'],     hours: '24/7' },
      { country: 'Philippines',  name: 'Hopeline (DOH)',                   tel: '0917 558 4673',       langs: ['en','tl'],hours: '24/7' },
      { country: 'Indonesia',    name: 'Yayasan Pulih',                    tel: '021 788 42580',       langs: ['id'],     hours: 'office' },
      { country: 'South Africa', name: 'SADAG',                            tel: '0800 567 567',        langs: ['en'],     hours: '24/7' },
      { country: 'Brazil',       name: 'Centro de Valorização da Vida',    tel: '188',                 langs: ['pt'],     hours: '24/7' },
      { country: 'Mexico',       name: 'Línea de la Vida',                 tel: '800 911 2000',        langs: ['es'],     hours: '24/7' },
      { country: 'Worldwide',    name: 'Find A Helpline directory',         tel: 'findahelpline.com',   langs: ['many'],   hours: 'online' }
    ],
    community: [
      { name: 'CSAGA',                              url: 'csaga.org.vn',                  region: 'Hà Nội',     focus_en: 'Gender, family, GBV counseling',            focus_vi: 'Tư vấn giới, gia đình, bạo lực' },
      { name: 'Trung tâm SCDI',                     url: 'scdi.org.vn',                   region: 'Hà Nội',     focus_en: 'Community health & development',           focus_vi: 'Sức khoẻ & phát triển cộng đồng' },
      { name: 'Ngôi nhà Bình yên',                  url: 'ngoinhabinhyen.org',            region: 'Toàn quốc',  focus_en: 'Children & families in crisis',            focus_vi: 'Trẻ em & gia đình khó khăn' },
      { name: 'Hội Bảo vệ Quyền trẻ em',            url: 'cvac.vn',                       region: 'Hà Nội',     focus_en: 'Child rights advocacy',                    focus_vi: 'Bảo vệ quyền trẻ em' },
      { name: 'World Vision Vietnam',               url: 'worldvision.com.vn',            region: 'Toàn quốc',  focus_en: 'Child wellbeing, sponsor programs',        focus_vi: 'Phúc lợi trẻ em' },
      { name: 'Plan International Vietnam',         url: 'plan.org.vn',                   region: 'Toàn quốc',  focus_en: 'Girls\' rights, child protection',         focus_vi: 'Quyền trẻ em gái' },
      { name: 'Caritas Vietnam',                    url: 'caritasvietnam.org',            region: 'Toàn quốc',  focus_en: 'Pastoral & community support',              focus_vi: 'Hỗ trợ mục vụ & cộng đồng' },
      { name: 'Hội Phụ nữ Việt Nam',                url: 'hoiphunu.org.vn',               region: 'Toàn quốc',  focus_en: 'Women\'s union support services',           focus_vi: 'Dịch vụ hỗ trợ của Hội Phụ nữ' }
    ]
  };

  // ----- 1c. WHISPERS -----
  // 30+ of each, hand-written, never repeated within a session.
  const WHISPERS = {
    en: {
      advice: [
        'You are not behind. You are exactly where your body is.',
        'Breathe in for four. Out for six. The world can wait.',
        'You have survived 100% of your hardest days so far.',
        'It is okay to do the smallest possible thing today.',
        'Rest is not laziness. It is repair.',
        'You do not have to earn your place here. It is already yours.',
        'A shower. A glass of water. That is a beginning.',
        'Your nervous system is doing its best with what it has.',
        'You are allowed to be a beginner at being okay.',
        'Soft is not the same as weak.',
        'You do not have to explain your mood to be valid.',
        'A heavy day is not a wasted day.',
        'You are not broken. You are weathered, like good wood.',
        'The quietest victories still count.',
        'Your worth is not a score on a screen.',
        'Slow breaths. You are not in a race.',
        'It is okay to ask for help. It is brave, not weak.',
        'You are allowed to be held by small things — a song, a tea, a sky.',
        'One thing at a time. One breath at a time.',
        'You are not a burden. You are a person, having a day.',
        'There is no deadline on healing.',
        'Your body is listening. Be kind in how you speak to it.',
        'You are more than the worst thought you had this week.',
        'You are allowed to take up space, even quietly.',
        'A small win is still a win. Celebrate it with a breath.',
        'You are not failing. You are feeling. They are different.',
        'Even this moment will pass. Softly. Like a cloud.',
        'You are doing better than your inner critic says.',
        'You do not have to be "fine." You just have to be here.',
        'A door is not a wall. If one closes, another will open — gently, when you are ready.'
      ],
      starMessages: [
        'You are a small light in a very large sky, and that is enough.',
        'Stars do not apologize for shining.',
        'You are not alone in this dark — there are hands you have not met yet.',
        'The night is long, but it is not forever.',
        'You are held by the same gravity that holds the stars.',
        'A light this small can still guide someone home.',
        'You are not falling. You are just between moments.',
        'The sky keeps the stars company. So do I.',
        'You can be dim and still matter.',
        'Even the moon goes through phases. So do you.',
        'You belong to a constellation you have not finished drawing yet.',
        'Quiet lights are still lights.',
        'You are not lost. You are exploring a dark room, slowly.',
        'The dark is not your enemy. It is a place to rest your eyes.',
        'You are made of the same dust as the stars. So is everyone who hurt you.',
        'There is a map being drawn by every step you take.',
        'You can change the shape of your sky any night you want.',
        'You do not have to shine all the time to be seen.',
        'Some lights are meant to be felt, not seen.',
        'A single star still tells you the night is not endless.',
        'You are not a fixed point. You are a journey, and the journey is beautiful.',
        'There is a name for the color of your light. It is hope.',
        'The dark is just the sky holding its breath with you.',
        'You are allowed to be a sky, not just a single point of light.',
        'Even on the dimmest night, you are still here. That is the point.'
      ],
      bubblePop: [
        'Drink a small glass of water. Right now.',
        'Put your hand on your chest. Feel it rise and fall.',
        'You are not late. You are on your own time.',
        'A stretch counts as a movement. Try one shoulder.',
        'You are allowed to be unproductive today.',
        'Look at one thing in this room that you like.',
        'A blanket is a perfectly good decision.',
        'You have a body. It is doing so much for you.',
        'The next breath is free. Take it.',
        'You are not a problem to be solved.',
        'A song you love is one tap away.',
        'Your slowest day is still a day you lived.',
        'You can do the next thing, and only the next thing.',
        'There is no wrong way to rest.',
        'You are softer than you think. That is a strength.',
        'A small walk to the window is allowed.',
        'You can change your mind. That is not failure.',
        'You are allowed to be the slowest person in the room.',
        'A piece of fruit is a perfectly good snack.',
        'You are doing your best with what you have right now.',
        'A single kind sentence to yourself is enough.',
        'You are not your worst thought.',
        'A pause is not a problem. It is a repair.',
        'You are allowed to be a person, not a performance.',
        'One small thing: unclench your jaw.',
        'You are a work in progress, and that is the whole point.',
        'A warm drink is a tiny act of love.',
        'You are not a burden for feeling heavy.',
        'A deep breath out is sometimes the bravest thing.',
        'You are allowed to take the long way home.'
      ]
    },
    vi: {
      advice: [
        'Bạn không hề chậm hơn ai cả. Bạn đang ở đúng chỗ cơ thể bạn đang ở.',
        'Hít vào bốn giây. Ra sáu giây. Thế giới có thể đợi.',
        'Bạn đã sống sót qua 100% những ngày khó khăn nhất cho đến giờ.',
        'Hôm nay làm điều nhỏ nhất cũng được.',
        'Nghỉ ngơi không phải lười. Đó là sửa chữa.',
        'Bạn không cần phải xứng đáng mới được ở đây. Chỗ này đã là của bạn rồi.',
        'Một cái tắm. Một ly nước. Vậy là bắt đầu rồi.',
        'Hệ thần kinh của bạn đang cố hết sức với những gì nó có.',
        'Bạn được phép là người mới bắt đầu học cách ổn.',
        'Dịu dàng không giống yếu đuối.',
        'Bạn không cần phải giải thích tâm trạng để được công nhận.',
        'Một ngày nặng nề không phải một ngày lãng phí.',
        'Bạn không hề hỏng. Bạn được tôi luyện, như gỗ tốt.',
        'Những chiến thắng lặng lẽ nhất vẫn được tính.',
        'Giá trị của bạn không phải là điểm số trên màn hình.',
        'Thở chậm thôi. Bạn không phải đang đua.',
        'Xin giúp đỡ là được. Đó là dũng cảm, không phải yếu đuối.',
        'Bạn được phép để những điều nhỏ ôm lấy — một bài hát, một tách trà, một bầu trời.',
        'Một thứ mỗi lần. Một hơi mỗi lần.',
        'Bạn không phải gánh nặng. Bạn là một người, đang trải qua một ngày.',
        'Không có hạn chót cho việc chữa lành.',
        'Cơ thể bạn đang lắng nghe. Hãy dịu dàng khi nói với nó.',
        'Bạn hơn cả suy nghĩ tệ nhất bạn từng có tuần này.',
        'Bạn được phép chiếm không gian, dù là lặng lẽ.',
        'Một chiến thắng nhỏ vẫn là chiến thắng. Ăn mừng nó bằng một hơi thở.',
        'Bạn không thất bại. Bạn đang cảm nhận. Hai điều đó khác nhau.',
        'Khoảnh khắc này cũng sẽ qua. Nhẹ nhàng. Như một đám mây.',
        'Bạn đang làm tốt hơn những gì người phán xét bên trong bạn nói.',
        'Bạn không cần phải "ổn." Bạn chỉ cần ở đây thôi.',
        'Một cánh cửa không phải bức tường. Nếu một cánh đóng, cánh khác sẽ mở — nhẹ nhàng, khi bạn sẵn sàng.'
      ],
      starMessages: [
        'Bạn là một ánh sáng nhỏ trong bầu trời rất rộng, và vậy là đủ.',
        'Sao không xin lỗi vì tỏa sáng.',
        'Bạn không cô đơn trong bóng tối này — có những bàn tay bạn chưa gặp.',
        'Đêm dài, nhưng không phải mãi mãi.',
        'Bạn được giữ bởi cùng lực hấp dẫn giữ các ngôi sao.',
        'Ánh sáng nhỏ thế này vẫn có thể dẫn ai đó về nhà.',
        'Bạn không đang rơi. Bạn chỉ đang giữa hai khoảnh khắc.',
        'Bầu trời bầu bạn với các ngôi sao. Mình cũng vậy.',
        'Bạn có thể mờ nhạt và vẫn quan trọng.',
        'Ngay cả mặt trăng cũng có lúc tròn lúc khuyết. Bạn cũng vậy.',
        'Bạn thuộc về một chòm sao bạn chưa vẽ xong.',
        'Ánh sáng lặng lẽ vẫn là ánh sáng.',
        'Bạn không lạc. Bạn đang khám phá một căn phòng tối, từ từ.',
        'Bóng tối không phải kẻ thù. Nó là nơi để mắt bạn nghỉ.',
        'Bạn được làm từ cùng bụi sao với các ngôi sao. Kẻ làm bạn đau cũng vậy.',
        'Có một bản đồ đang được vẽ bởi mỗi bước bạn đi.',
        'Bạn có thể đổi hình dạng bầu trời bất cứ đêm nào bạn muốn.',
        'Bạn không cần phải sáng mãi để được nhìn thấy.',
        'Một số ánh sáng được tạo ra để cảm nhận, không phải để nhìn thấy.',
        'Một ngôi sao đơn lẻ vẫn nói với bạn rằng đêm không vô tận.',
        'Bạn không phải một điểm cố định. Bạn là một hành trình, và hành trình đó đẹp.',
        'Có một tên cho màu ánh sáng của bạn. Đó là hy vọng.',
        'Bóng tối chỉ là bầu trời nín thở cùng bạn.',
        'Bạn được phép là cả bầu trời, không chỉ một điểm sáng.',
        'Ngay cả đêm mờ nhất, bạn vẫn ở đây. Đó là điều quan trọng.'
      ],
      bubblePop: [
        'Uống một ly nước nhỏ. Ngay bây giờ.',
        'Đặt tay lên ngực. Cảm thấy nó phồng lên và hạ xuống.',
        'Bạn không trễ. Bạn đang theo nhịp của riêng mình.',
        'Một cái duỗi người cũng là vận động. Thử một bên vai đi.',
        'Hôm nay bạn được phép không hiệu quả.',
        'Nhìn một thứ trong phòng này mà bạn thích.',
        'Một cái chăn là một quyết định hoàn toàn tốt.',
        'Bạn có một cơ thể. Nó đang làm rất nhiều cho bạn.',
        'Hơi thở tiếp theo miễn phí. Lấy đi.',
        'Bạn không phải vấn đề cần giải quyết.',
        'Một bài hát bạn yêu thích chỉ cách một lần chạm.',
        'Ngày chậm nhất của bạn vẫn là ngày bạn đã sống.',
        'Bạn có thể làm điều tiếp theo, và chỉ điều tiếp theo.',
        'Không có cách nào sai để nghỉ ngơi.',
        'Bạn mềm mại hơn bạn nghĩ. Đó là sức mạnh.',
        'Một bước nhỏ đến cửa sổ cũng được.',
        'Bạn được phép đổi ý. Đó không phải thất bại.',
        'Bạn được phép là người chậm nhất trong phòng.',
        'Một miếng trái cây là một bữa xế hoàn toàn tốt.',
        'Bạn đang cố hết sức với những gì bạn có lúc này.',
        'Một câu tử tế với chính mình là đủ.',
        'Bạn không phải suy nghĩ tệ nhất của bạn.',
        'Một khoảng dừng không phải vấn đề. Đó là sửa chữa.',
        'Bạn được phép là một con người, không phải một màn trình diễn.',
        'Một điều nhỏ: thả lỏng hàm đi.',
        'Bạn đang trong quá trình hoàn thiện, và đó là cả ý nghĩa.',
        'Một thức uống ấm là một hành động nhỏ của tình yêu.',
        'Bạn không phải gánh nặng vì cảm thấy nặng nề.',
        'Một hơi thở ra sâu đôi khi là điều dũng cảm nhất.',
        'Bạn được phép đi đường dài về nhà.'
      ]
    }
  };

  // Mood labels (lookup by index for i18n)
  const MOOD_KEYS = ['heavy', 'scattered', 'soft', 'tender', 'quiet'];
  const NEGATIVE_MOODS = new Set(['heavy', 'scattered']); // triggers "checking" branch

  // When moods feel heavy/scattered, gently offer a real-safety interstitial.
  const SAFETY_MOODS = new Set(['heavy', 'scattered']);


  /* =========================================================
     2. STATE + PERSISTENCE
     ========================================================= */

  const STORAGE_KEY = 'beingenough:v2:state';

  function defaultState() {
    return {
      v: 2,
      user: { name: null, locale: detectInitialLocale(), firstVisit: new Date().toISOString(), firstVisitSeen: false, visitCount: 0 },
      moods: [],
      prefs: { sound: 'off', motion: 'full', theme: 'wheat' },

      // Breathing + Grounding gameplay state
      breath: {
        presetKey: '446',     // '446' | '448' | '335'
        running: false,
        cycles: 0,
        phase: 'in',          // 'in' | 'hold' | 'out' | 'rest'
        phaseIndex: 0,
        phaseStartedAt: null,
        phaseDurationMs: 0,
        totalPausedAt: null
      },
      ground: {
        step: 0,              // 0..4 (5..1)
        done: false
      },

      oasis: { teaBrewedAt: null, plantGrowth: 0, lampOn: true, lampWarmth: 0.6 },
      garden: [],
      sky: [],
      bubblesCaught: 0
    };
  }

  function detectInitialLocale() {
    const nav = (navigator.language || 'en').toLowerCase();
    return nav.startsWith('vi') ? 'vi' : 'en';
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultState();
      const parsed = JSON.parse(raw);
      if (!parsed || parsed.v !== 2) return defaultState();
      // repair
      const def = defaultState();
      return {
        v: 2,
        user: { ...def.user, ...(parsed.user || {}) },
        moods: Array.isArray(parsed.moods) ? parsed.moods.slice(-180) : [],
        prefs: { ...def.prefs, ...(parsed.prefs || {}) },
        oasis: { ...def.oasis, ...(parsed.oasis || {}) },
        garden: Array.isArray(parsed.garden) ? parsed.garden.slice(-30) : [],
        sky: Array.isArray(parsed.sky) ? parsed.sky.slice(-50) : [],
        bubblesCaught: typeof parsed.bubblesCaught === 'number' ? parsed.bubblesCaught : 0
      };
    } catch (e) {
      return defaultState();
    }
  }

  let State = loadState();
  State.user.visitCount = (State.user.visitCount || 0) + 1;

  function persist() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(State)); } catch (e) { /* quota */ }
  }

  /* =========================================================
     3. THEME + LOCALE + AMBIENT
     ========================================================= */

  function t(key, vars) {
    const dict = I18N[State.user.locale] || I18N.en;
    let s = dict[key] || I18N.en[key] || key;
    if (vars) s = s.replace(/\{(\w+)\}/g, (_, k) => vars[k] != null ? vars[k] : '');
    return s;
  }

  function applyLocale() {
    document.documentElement.lang = State.user.locale;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      el.textContent = t(el.getAttribute('data-i18n'));
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
      el.setAttribute('placeholder', t(el.getAttribute('data-i18n-ph')));
    });
    document.querySelectorAll('.locale-label').forEach(el => {
      el.classList.toggle('active', el.getAttribute('data-locale') === State.user.locale);
    });
    renderGreeting();
    renderMoodChips();
    renderHelplines();
    if (window._sky && window._sky.initialized) window._sky.render();
    if (window._breath) window._breath.refresh();
    if (window._ground) window._ground.refresh();
  }

  function applyTheme() {
    document.body.classList.toggle('theme-night', State.prefs.theme === 'night');
    document.body.classList.toggle('theme-wheat', State.prefs.theme === 'wheat');
  }

  function initAmbient() {
    // Leaves
    const leafHost = document.getElementById('leaves');
    if (leafHost) {
      const leafSVG = '<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2 Q14 8 12 12 Q10 8 12 2 M12 12 Q18 14 22 12 Q18 10 12 12 M12 12 Q6 14 2 12 Q6 10 12 12" opacity="0.7"/></svg>';
      for (let i = 0; i < 5; i++) {
        const el = document.createElement('div');
        el.className = 'leaf-svg';
        el.style.left = (Math.random() * 100) + 'vw';
        el.style.color = ['#E8B86D', '#C9B8D8', '#8AA487', '#D89A9A'][i % 4];
        el.style.animationDuration = (18 + Math.random() * 10) + 's';
        el.style.animationDelay = (-Math.random() * 20) + 's';
        el.style.transform = `scale(${0.7 + Math.random() * 0.6})`;
        el.innerHTML = leafSVG;
        leafHost.appendChild(el);
      }
    }
    // Fireflies
    const ffHost = document.getElementById('fireflies');
    if (ffHost) {
      for (let i = 0; i < 8; i++) {
        const el = document.createElement('div');
        el.className = 'firefly';
        el.style.left = (Math.random() * 100) + 'vw';
        el.style.top  = (Math.random() * 100) + 'vh';
        el.style.animationDuration = (4 + Math.random() * 4) + 's';
        el.style.animationDelay = (-Math.random() * 5) + 's';
        ffHost.appendChild(el);
      }
    }
  }

  /* =========================================================
     4. NOTE MODAL + SAFETY INTERSTITIAL
     ========================================================= */

  function getCountryHint() {
    // Offline heuristic only.
    const lang = (navigator.language || '').toLowerCase();
    if (lang.startsWith('vi')) return 'vietnam';
    return 'global';
  }

  function openSafetyModal() {
    const modal = document.getElementById('safety-modal');
    if (!modal) return;

    const closeBtn = document.getElementById('safety-close');
    const contBtn = document.getElementById('safety-continue');
    const backdrop = modal.querySelector('.note-backdrop');
    const card = modal.querySelector('.note-card');

    const previouslyFocused = { el: null };
    const focusableSelector = 'button,[href],input,textarea,select,[tabindex]:not([tabindex="-1"])';

    function getFocusable() {
      return Array.from(card.querySelectorAll(focusableSelector))
        .filter(el => !el.disabled && el.offsetParent !== null);
    }

    function populateList() {
      const list = document.getElementById('safety-list');
      if (!list) return;
      list.innerHTML = '';

      const hint = getCountryHint();
      const candidates = hint === 'vietnam' ? HELPLINES.vietnam : HELPLINES.global.slice(0, 10);
      // Keep it short: 4 options.
      candidates.slice(0, 4).forEach(h => {
        const li = document.createElement('li');
        const name = h.name;
        const tel = h.tel;
        const hours = h.hours ? ` · ${h.hours}` : '';
        li.textContent = `${name}: ${tel}${hours}`;
        list.appendChild(li);
      });
    }

    function close() {
      modal.classList.add('hidden');
      document.removeEventListener('keydown', onKeyDown, true);
      if (previouslyFocused.el && typeof previouslyFocused.el.focus === 'function') previouslyFocused.el.focus();
    }

    function open() {
      previouslyFocused.el = document.activeElement;
      populateList();
      modal.classList.remove('hidden');
      setTimeout(() => {
        const focusables = getFocusable();
        (focusables[0] || closeBtn || contBtn || card)?.focus?.();
      }, 0);
      document.addEventListener('keydown', onKeyDown, true);
    }

    function onKeyDown(e) {
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== 'Tab') return;
      const focusables = getFocusable();
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;

      if (e.shiftKey) {
        if (active === first || !card.contains(active)) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    contBtn?.addEventListener('click', () => close());
    closeBtn?.addEventListener('click', () => close());
    backdrop?.addEventListener('click', () => close());
    open();
  }

  function maybeShowNote() {
    const modal = document.getElementById('note-modal');
    if (!modal) return;

    const closeBtn = document.getElementById('note-close');
    const backdrop = modal.querySelector('.note-backdrop');
    const card = modal.querySelector('.note-card');
    const previouslyFocused = { el: null };
    const focusableSelector =
      'button,[href],input,textarea,select,[tabindex]:not([tabindex="-1"])';

    function getFocusable() {
      return Array.from(card.querySelectorAll(focusableSelector))
        .filter(el => !el.disabled && el.offsetParent !== null);
    }

    function close() {
      State.user.firstVisitSeen = true;
      persist();
      modal.classList.add('hidden');
      document.removeEventListener('keydown', onKeyDown, true);
      if (previouslyFocused.el && typeof previouslyFocused.el.focus === 'function') {
        previouslyFocused.el.focus();
      }
    }

    function open() {
      previouslyFocused.el = document.activeElement;
      modal.classList.remove('hidden');

      // Move focus inside the modal.
      setTimeout(() => {
        const focusables = getFocusable();
        (focusables[0] || closeBtn || card)?.focus?.();
      }, 0);

      document.addEventListener('keydown', onKeyDown, true);
    }

    function onKeyDown(e) {
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== 'Tab') return;

      const focusables = getFocusable();
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;

      if (e.shiftKey) {
        if (active === first || !card.contains(active)) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    // initial open
    if (!State.user.firstVisitSeen) open();

    closeBtn?.addEventListener('click', close);
    backdrop?.addEventListener('click', close);

    // if backdrop clicked via focus, allow Enter/Space
    backdrop?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        close();
      }
    });
  }

  /* =========================================================
     5. GREETING + MOOD
     ========================================================= */

  function pickGreeting() {
    const last = [...State.moods].sort((a, b) => b.ts - a.ts)[0];
    const HOUR = 36 * 60 * 60 * 1000;
    const recent = last && (Date.now() - last.ts) < HOUR;
    const negative = last && NEGATIVE_MOODS.has(last.label);
    const name = State.user.name;

    if (recent && negative) {
      return name ? t('greet.checking.named', { name }) : t('greet.checking');
    }
    if (State.user.visitCount > 1) {
      return name ? t('greet.returning.named', { name }) : t('greet.returning');
    }
    return name ? t('greet.fresh.named', { name }) : t('greet.fresh');
  }

  function renderGreeting() {
    const el = document.getElementById('greeting-text');
    if (!el) return;
    el.textContent = pickGreeting();
  }

  function renderMoodChips() {
    const host = document.getElementById('mood-chips');
    if (!host) return;
    host.innerHTML = '';
    MOOD_KEYS.forEach(key => {
      const b = document.createElement('button');
      b.className = 'mood-chip';
      b.type = 'button';
      b.textContent = t('mood.' + key);
      b.dataset.mood = key;
      b.addEventListener('click', () => {
        document.querySelectorAll('.mood-chip').forEach(c => c.classList.remove('selected'));
        b.classList.add('selected');
        document.getElementById('mood-note-wrap').classList.remove('hidden');
        document.getElementById('mood-note').focus();
      });
      host.appendChild(b);
    });
  }

  function bindMood() {
    const save = document.getElementById('mood-save');
    const cancel = document.getElementById('mood-cancel');
    if (!save) return;

    function maybeOpenSafetyForMood(label) {
      if (!SAFETY_MOODS.has(label)) return;
      const safetyModal = document.getElementById('safety-modal');
      if (!safetyModal) return;
      openSafetyModal();
    }


    save.addEventListener('click', () => {
      const sel = document.querySelector('.mood-chip.selected');
      if (!sel) return;
      const label = sel.dataset.mood;
      const note = (document.getElementById('mood-note').value || '').trim().slice(0, 140);
      const intensity = label === 'heavy' || label === 'scattered' ? 4 : (label === 'tender' ? 2 : 2);

      // Soft safety interstitial on heavy/scattered.
      maybeOpenSafetyForMood(label);

      State.moods.push({
        id: 'm_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
        ts: Date.now(),
        label,
        intensity,
        note
      });
      State.moods = State.moods.slice(-180);
      persist();

      const ack = document.getElementById('mood-ack');
      ack.textContent = t('mood.ack');
      ack.classList.remove('hidden');

      document.getElementById('mood-note-wrap').classList.add('hidden');
      document.getElementById('mood-note').value = '';
      document.querySelectorAll('.mood-chip').forEach(c => c.classList.remove('selected'));

      setTimeout(() => { ack.classList.add('hidden'); }, 5000);
    });

    cancel.addEventListener('click', () => {
      document.getElementById('mood-note-wrap').classList.add('hidden');
      document.getElementById('mood-note').value = '';
      document.querySelectorAll('.mood-chip').forEach(c => c.classList.remove('selected'));
    });
  }

  /* =========================================================
     6. OASIS — tea, plant, lamp
     ========================================================= */

  function bindTea() {
    const stage = document.getElementById('tea-stage');
    const btn = document.getElementById('tea-btn');
    if (!btn) return;
    btn.addEventListener('click', () => {
      if (stage.dataset.state === 'brewing') return;
      stage.dataset.state = 'brewing';
      State.oasis.teaBrewedAt = Date.now();
      persist();
      btn.textContent = t('oasis.tea.brewed');
      setTimeout(() => { stage.dataset.state = 'idle'; btn.textContent = t('oasis.tea.btn'); }, 60 * 1000);
    });
  }

  function bindPlant() {
    const stage = document.getElementById('plant-stage');
    const btn = document.getElementById('plant-btn');
    const leaves = document.getElementById('plant-leaves');
    const numEl = document.getElementById('plant-growth-num');
    if (!btn) return;

    function applyGrow() {
      const g = State.oasis.plantGrowth;
      const tier = g >= 75 ? 3 : g >= 40 ? 2 : g >= 15 ? 1 : 0;
      leaves.setAttribute('data-grow', tier);
      numEl.textContent = g;
    }
    applyGrow();

    btn.addEventListener('click', () => {
      State.oasis.plantGrowth = Math.min(100, State.oasis.plantGrowth + 3);
      persist();
      applyGrow();
      stage.classList.remove('watered');
      void stage.offsetWidth;
      stage.classList.add('watered');
      const original = btn.textContent;
      btn.textContent = t('oasis.plant.watered');
      setTimeout(() => { btn.textContent = t('oasis.plant.btn'); }, 2500);
    });
  }

  function bindLamp() {

    const room = document.getElementById('oasis-room');
    const btn = document.getElementById('lamp-btn');
    const slider = document.getElementById('lamp-warmth');
    if (!btn) return;

    function apply() {
      room.classList.toggle('lamp-on', State.oasis.lampOn);
      const w = (State.oasis.lampWarmth - 0.3) / 0.7;
      room.style.setProperty('--warmth', (0.3 + w * 0.7).toFixed(2));
      slider.value = Math.round(State.oasis.lampWarmth * 100);
    }
    apply();

    btn.addEventListener('click', () => {
      State.oasis.lampOn = !State.oasis.lampOn;
      persist();
      apply();
    });
    slider.addEventListener('input', () => {
      State.oasis.lampWarmth = parseInt(slider.value, 10) / 100;
      room.style.setProperty('--warmth', State.oasis.lampWarmth.toFixed(2));
      persist();
    });
  }

  /* =========================================================
     7. BREATHING + GROUNDING
     ========================================================= */

  const Breath = (() => {
    let els = null;
    let rafId = null;
    let phaseTimer = null;

    const PRESETS = [
      { key: '446', phases: [ { label: 'in', ms: 4000 }, { label: 'hold', ms: 0 }, { label: 'out', ms: 6000 }, { label: 'rest', ms: 1000 } ] },
      { key: '448', phases: [ { label: 'in', ms: 4000 }, { label: 'hold', ms: 0 }, { label: 'out', ms: 8000 }, { label: 'rest', ms: 1000 } ] },
      { key: '335', phases: [ { label: 'in', ms: 3000 }, { label: 'hold', ms: 0 }, { label: 'out', ms: 5000 }, { label: 'rest', ms: 1200 } ] }
    ];

    function msForPreset(presetKey) {
      const p = PRESETS.find(x => x.key === presetKey) || PRESETS[0];
      return p.phases.reduce((acc, ph) => acc + (ph.ms || 0), 0);
    }

    function setPhase(phaseIndex, startedAt) {
      if (!els) return;
      const preset = PRESETS.find(x => x.key === State.breath.presetKey) || PRESETS[0];
      const phases = preset.phases;

      const phase = phases[phaseIndex] || phases[0];
      const label = phase.label;

      State.breath.phaseIndex = phaseIndex;
      State.breath.phase = label;
      State.breath.phaseStartedAt = startedAt || Date.now();
      State.breath.phaseDurationMs = phase.ms || 0;
      persist();

      els.cycles.textContent = `${State.breath.cycles}`;
      els.phaseText.textContent = t('breath.' + (label === 'in' ? 'in' : label === 'out' ? 'out' : label === 'hold' ? 'hold' : 'rest'));
      els.phaseSub.textContent = t('breath.cycles');
      els.ringProgress.style.setProperty('--p', `${Math.round(0)}%`);

      if (rafId) cancelAnimationFrame(rafId);
      if (phaseTimer) clearInterval(phaseTimer);

      if ((phase.ms || 0) <= 0) {
        tickNext();
      } else {
        rafId = requestAnimationFrame(renderProgressLoop);
        phaseTimer = setInterval(renderProgressLoop, 200);
      }
    }

    function renderProgressLoop() {
      if (!els) return;
      const startedAt = State.breath.phaseStartedAt;
      const dur = State.breath.phaseDurationMs;
      if (!startedAt || !dur) return;

      const elapsed = Date.now() - startedAt;
      const p = Math.max(0, Math.min(1, elapsed / dur));
      els.ringProgress.style.setProperty('--p', `${Math.round(p * 100)}%`);

      if (p >= 1) {
        if (rafId) cancelAnimationFrame(rafId);
        if (phaseTimer) clearInterval(phaseTimer);
        tickNext();
      }
    }

    function tickNext() {
      const preset = PRESETS.find(x => x.key === State.breath.presetKey) || PRESETS[0];
      const phases = preset.phases;
      const next = (State.breath.phaseIndex + 1) % phases.length;

      // Count cycles when we return to first phase (in)
      if (next === 0) State.breath.cycles += 1;

      if (!State.breath.running) {
        // When paused/stopped, keep state but no auto advance.
        persist();
        return;
      }
      setPhase(next, Date.now());
    }

    function refresh() {
      els = els || {
        toggle: document.getElementById('breath-toggle'),
        reset: document.getElementById('breath-reset'),
        presetButtons: Array.from(document.querySelectorAll('.breath-preset[data-preset]')),
        status: document.getElementById('breath-status'),
        cycles: document.getElementById('breath-cycles'),
        phaseText: document.getElementById('breath-phase'),
        phaseSub: document.getElementById('breath-cycle-sub'),
        ringProgress: document.querySelector('.breath-ring-progress'),
        ringInner: document.querySelector('.breath-ring-inner')
      };

      if (!els.toggle || !els.reset || !els.phaseText || !els.ringProgress) return;

      // preset highlight
      els.presetButtons.forEach(btn => {
        const k = btn.getAttribute('data-preset');
        btn.classList.toggle('selected', k === State.breath.presetKey);
      });

      els.toggle.textContent = State.breath.running ? t('breath.stop') : t('breath.start');
      els.phaseText.textContent = t('breath.' + (State.breath.phase === 'in' ? 'in' : State.breath.phase === 'out' ? 'out' : State.breath.phase === 'hold' ? 'hold' : 'rest'));
      els.cycles && (els.cycles.textContent = State.breath.cycles + '');
      if (els.phaseSub) els.phaseSub.textContent = t('breath.cycles');
      els.ringProgress.style.setProperty('--p', '0%');

      // sync phase duration from preset
      const preset = PRESETS.find(x => x.key === State.breath.presetKey) || PRESETS[0];
      const phases = preset.phases;
      const ph = phases[State.breath.phaseIndex] || phases[0];
      State.breath.phaseDurationMs = ph.ms || 0;
      if (State.breath.phaseStartedAt == null) State.breath.phaseStartedAt = Date.now();
      persist();
    }

    function start() {
      State.breath.running = true;
      persist();
      const preset = PRESETS.find(x => x.key === State.breath.presetKey) || PRESETS[0];
      const phases = preset.phases;

      const startIndex = Math.max(0, Math.min(phases.length - 1, State.breath.phaseIndex || 0));
      setPhase(startIndex === 0 ? 0 : startIndex, Date.now());

      if (els) refresh();
    }

    function stop() {
      State.breath.running = false;
      persist();
      if (rafId) cancelAnimationFrame(rafId);
      if (phaseTimer) clearInterval(phaseTimer);
      rafId = null; phaseTimer = null;
      if (els) refresh();
    }

    function reset() {
      stop();
      State.breath.cycles = 0;
      State.breath.phase = 'in';
      State.breath.phaseIndex = 0;
      State.breath.phaseStartedAt = Date.now();
      const preset = PRESETS.find(x => x.key === State.breath.presetKey) || PRESETS[0];
      State.breath.phaseDurationMs = preset.phases[0].ms || 0;
      persist();
      refresh();
    }

    function bind() {
      const toggle = document.getElementById('breath-toggle');
      const resetBtn = document.getElementById('breath-reset');
      if (!toggle || !resetBtn) return;

      // preset selection
      document.querySelectorAll('.breath-preset[data-preset]').forEach(btn => {
        btn.addEventListener('click', () => {
          const k = btn.getAttribute('data-preset');
          State.breath.presetKey = k;
          State.breath.phaseIndex = 0;
          State.breath.phase = 'in';
          State.breath.phaseStartedAt = Date.now();
          State.breath.cycles = State.breath.running ? State.breath.cycles : State.breath.cycles;
          persist();
          refresh();
        });
      });

      toggle.addEventListener('click', () => {
        if (State.breath.running) stop();
        else start();
      });

      resetBtn.addEventListener('click', () => reset());
    }

    function init() {
      bind();
      refresh();
    }

    return { init, refresh };
  })();

  const Grounding = (() => {
    let els = null;

    const STEPS = [
      { key: '5', i18n: 'ground.5' },
      { key: '4', i18n: 'ground.4' },
      { key: '3', i18n: 'ground.3' },
      { key: '2', i18n: 'ground.2' },
      { key: '1', i18n: 'ground.1' }
    ];

    function currentStep() {
      const idx = Math.max(0, Math.min(4, State.ground.step || 0));
      return STEPS[idx];
    }

    function refresh() {
      els = els || {
        stepButtons: Array.from(document.querySelectorAll('.ground-step-btn[data-step]')),
        label: document.getElementById('ground-step-label'),
        instructions: document.getElementById('ground-instructions'),
        instructionText: document.getElementById('ground-instruction-text'),
        next: document.getElementById('ground-next'),
        reset: document.getElementById('ground-reset'),
        doneWrap: document.getElementById('ground-done')
      };

      if (!els.label || !els.instructions || !els.next || !els.reset) return;

      els.stepButtons.forEach(b => {
        const idx = parseInt(b.getAttribute('data-step'), 10); // 5..1
        const my = parseInt(String(currentStep().key), 10);
        b.classList.toggle('active', idx === my);
      });

      const step = currentStep();

      if (State.ground.done) {
        if (els.doneWrap) els.doneWrap.classList.remove('hidden');
        if (els.next) els.next.classList.add('hidden');
        if (els.instructions) els.instructions.classList.add('hidden');
        els.label.textContent = t('ground.done');
      } else {
        if (els.doneWrap) els.doneWrap.classList.add('hidden');
        if (els.next) els.next.classList.remove('hidden');
        if (els.instructions) els.instructions.classList.remove('hidden');
        els.label.textContent = t(step.i18n);
        if (els.instructionText) els.instructionText.textContent = t(step.i18n);
      }
      persist();
    }

    function setStep(stepIndex) {
      State.ground.step = Math.max(0, Math.min(4, stepIndex));
      State.ground.done = false;
      persist();
      refresh();
    }

    function next() {
      if (State.ground.done) return;
      if (State.ground.step >= 4) {
        State.ground.done = true;
      } else {
        State.ground.step += 1;
      }
      persist();
      refresh();
    }

    function reset() {
      State.ground.step = 0;
      State.ground.done = false;
      persist();
      refresh();
    }

    function bind() {
      const nextBtn = document.getElementById('ground-next');
      const resetBtn = document.getElementById('ground-reset');
      if (!nextBtn || !resetBtn) return;

      document.querySelectorAll('.ground-step-btn[data-step]').forEach(btn => {
        btn.addEventListener('click', () => {
          const num = parseInt(btn.getAttribute('data-step'), 10); // 5..1
          const idx = 5 - num; // if num=5 idx=0; num=1 idx=4
          State.ground.step = idx;
          State.ground.done = false;
          persist();
          refresh();
        });
      });

      nextBtn.addEventListener('click', () => next());
      resetBtn.addEventListener('click', () => reset());
    }

    function init() {
      bind();
      refresh();
    }

    return { init, refresh };
  })();

  /* =========================================================
     7. WORD GARDEN (Canvas)
     ========================================================= */

  const Garden = (() => {
    let canvas, ctx, w, h, dpr;
    let branches = [];   // each: {id, text, nodes:[{x,y}], t0, dur}
    let rafId = null;
    let observer = null;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function init() {
      canvas = document.getElementById('garden-canvas');
      if (!canvas) return;
      ctx = canvas.getContext('2d');
      resize();
      window.addEventListener('resize', resize);

      // Replay saved branches
      State.garden.forEach(b => {
        if (reduce) return; // skip animation
        branches.push({ ...b, t0: Date.now(), dur: 0, done: true });
      });
      start();

      observer = new IntersectionObserver(entries => {
        entries.forEach(e => e.isIntersecting ? start() : stop());
      }, { threshold: 0.05 });
      observer.observe(canvas);

      const input = document.getElementById('garden-input');
      const count = document.getElementById('garden-count');
      const submit = document.getElementById('garden-submit');
      input.addEventListener('input', () => { count.textContent = input.value.length; });
      submit.addEventListener('click', () => {
        const text = input.value.trim().slice(0, 140);
        if (!text) return;
        input.value = '';
        count.textContent = '0';
        plant(text);
      });
    }

    function resize() {
      dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function plant(text) {
      const startX = 40 + Math.random() * (w - 80);
      const startY = h - 20;
      const branch = {
        id: 'g_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
        text,
        nodes: [{ x: startX, y: startY }],
        t0: Date.now(),
        dur: reduce ? 0 : 8000,
        done: reduce
      };
      // Generate organic L-system-ish nodes (upward, meandering)
      let x = startX, y = startY;
      const segs = 22;
      for (let i = 0; i < segs; i++) {
        const ang = (-Math.PI / 2) + (Math.sin(i * 0.7) * 0.6) + (Math.random() - 0.5) * 0.4;
        const len = 6 + Math.random() * 6;
        x += Math.cos(ang) * len;
        y += Math.sin(ang) * len;
        if (y < 30) break;
        branch.nodes.push({ x, y });
      }
      if (!reduce) {
        branches.push(branch);
      } else {
        branch.done = true;
        branches.push(branch);
      }
      State.garden.push({ id: branch.id, text, nodes: branch.nodes });
      State.garden = State.garden.slice(-30);
      persist();
      if (!rafId) start();
    }

    function start() {
      if (rafId) return;
      rafId = requestAnimationFrame(tick);
    }
    function stop() {
      if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
    }

    function tick() {
      rafId = requestAnimationFrame(tick);
      ctx.clearRect(0, 0, w, h);
      // soil line
      ctx.fillStyle = 'rgba(123,94,63,0.18)';
      ctx.fillRect(0, h - 8, w, 8);

      const now = Date.now();
      branches.forEach(b => {
        const elapsed = now - b.t0;
        const progress = b.dur > 0 ? Math.min(1, elapsed / b.dur) : 1;
        const nodes = b.nodes;
        const drawCount = Math.max(1, Math.floor(nodes.length * progress));

        // Stem
        ctx.strokeStyle = '#5C7A4F';
        ctx.lineWidth = 1.4;
        ctx.lineCap = 'round';
        ctx.beginPath();
        for (let i = 0; i < drawCount; i++) {
          const n = nodes[i];
          if (i === 0) ctx.moveTo(n.x, n.y); else ctx.lineTo(n.x, n.y);
        }
        ctx.stroke();

        // Leaves at every 4th node
        ctx.fillStyle = 'rgba(138,164,135,0.7)';
        for (let i = 3; i < drawCount; i += 4) {
          const n = nodes[i];
          const r = 2 + (i / nodes.length) * 2;
          ctx.beginPath();
          ctx.ellipse(n.x - 3, n.y - 2, r, r * 0.5, -0.5, 0, Math.PI * 2);
          ctx.fill();
        }

        // Tiny flower at top if progress done
        if (progress >= 1 && nodes.length > 4) {
          const tip = nodes[drawCount - 1] || nodes[nodes.length - 1];
          ctx.fillStyle = 'rgba(216,154,154,0.7)';
          ctx.beginPath();
          ctx.arc(tip.x, tip.y, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      });
    }

    return { init };
  })();

  /* =========================================================
     8. CONSTELLATION SKY (Canvas + Web Audio, opt-in)
     ========================================================= */

  const Sky = (() => {
    let canvas, ctx, w, h, dpr;
    let stars = [];          // background seeded stars
    let placed = State.sky;  // user stars (persisted)
    let threads = [];        // active thread animations
    let rafId = null;
    let observer = null;
    let audio = null;
    let audioReady = false;
    let initialized = false;
    let releaseTarget = null; // star pending release
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Seeded PRNG (mulberry32)
    function mulberry32(a) {
      return function () {
        a |= 0; a = a + 0x6D2B79F5 | 0;
        let t = a;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
      };
    }

    function init() {
      canvas = document.getElementById('sky-canvas');
      if (!canvas) return;
      ctx = canvas.getContext('2d');
      resize();
      window.addEventListener('resize', resize);

      const rng = mulberry32(987654321);
      for (let i = 0; i < 120; i++) {
        stars.push({
          x: rng() * 100, // %
          y: rng() * 100,
          r: 0.3 + rng() * 1.2,
          tw: rng() * Math.PI * 2
        });
      }

      canvas.addEventListener('click', (e) => onClick(e));
      start();
      initialized = true;

      observer = new IntersectionObserver(entries => {
        entries.forEach(en => en.isIntersecting ? start() : stop());
      }, { threshold: 0.05 });
      observer.observe(canvas);

      const moonBtn = document.getElementById('moon-btn');
      moonBtn.classList.toggle('active', State.prefs.sound === 'soft');
      const skyClear = document.getElementById('sky-clear');
      skyClear.addEventListener('click', () => {
        if (!confirm(State.user.locale === 'vi' ? 'Buông các ngôi sao của bạn?' : 'Let go of your stars?')) return;
        placed = [];
        State.sky = [];
        threads = [];
        persist();
        render();
      });
    }

    function resize() {
      dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function onClick(e) {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      // Hit-test existing star (within 14px)
      const hit = placed.slice().reverse().find(s => Math.hypot(s.x - x, s.y - y) < 14 && !s.releasing);
      if (hit) {
        showWhisper(hit);
        return;
      }
      const star = { id: 's_' + Date.now().toString(36) + Math.random().toString(36).slice(2,6), x, y, ts: Date.now() };
      placed.push(star);
      State.sky.push(star);
      State.sky = State.sky.slice(-50);
      persist();
      // spawn threads to 1-2 nearest stars
      const others = placed.slice(0, -1);
      others.sort((a,b) => Math.hypot(a.x-x,a.y-y) - Math.hypot(b.x-x,b.y-y));
      const n = others.length === 0 ? 0 : (others.length < 2 ? 1 : (Math.random() < 0.5 ? 1 : 2));
      for (let i = 0; i < n; i++) {
        const target = others[i];
        threads.push({ a: { x, y }, b: { x: target.x, y: target.y }, t0: Date.now(), dur: reduce ? 0 : 1800, done: reduce, onContact: () => playNote() });
      }
      if (!rafId) start();
    }

    function showWhisper(star) {
      const el = document.getElementById('sky-whisper');
      const idx = State.sky.findIndex(s => s.id === star.id);
      const dict = WHISPERS[State.user.locale] || WHISPERS.en;
      const msg = dict.starMessages[idx % dict.starMessages.length];
      const releaseLabel = t('sky.release');
      el.innerHTML = `<span>${msg}</span> <button class="release-btn" data-id="${star.id}">${releaseLabel}</button>`;
      el.classList.add('show');
      clearTimeout(showWhisper._t);
      const btn = el.querySelector('.release-btn');
      if (btn) {
        btn.addEventListener('click', (ev) => {
          ev.stopPropagation();
          releaseStar(star.id);
          el.classList.remove('show');
        });
      }
      showWhisper._t = setTimeout(() => el.classList.remove('show'), 7000);
    }

    function start() { if (!rafId) rafId = requestAnimationFrame(tick); }
    function stop()  { if (rafId) { cancelAnimationFrame(rafId); rafId = null; } }

    function tick() {
      rafId = requestAnimationFrame(tick);
      const now = Date.now();
      drawBg(now);
      drawPlaced();
      drawThreads(now);
      // prune finished threads
      threads = threads.filter(th => !th.done || (now - th.t0) < 2200);
    }

    function drawBg(now) {
      ctx.fillStyle = State.prefs.theme === 'night' ? '#0F0E1E' : '#1B1A2E';
      ctx.fillRect(0, 0, w, h);
      // stars
      const t = now / 1000;
      stars.forEach(s => {
        const a = 0.4 + Math.sin(t * 1.2 + s.tw) * 0.4;
        ctx.fillStyle = `rgba(244,236,216,${a.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(s.x / 100 * w, s.y / 100 * h, s.r, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    function drawPlaced() {
      // constellation path (3+ stars)
      if (placed.filter(p => !p.releasing).length >= 3) {
        const pts = placed.filter(p => !p.releasing);
        ctx.strokeStyle = 'rgba(232,184,109,0.10)';
        ctx.lineWidth = 0.8;
        ctx.setLineDash([2, 4]);
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
        ctx.stroke();
        ctx.setLineDash([]);
      }
      placed.forEach(s => {
        let alpha = 1;
        if (s.releasing) {
          const p = Math.min(1, (Date.now() - s.releaseStart) / 1500);
          alpha = 1 - p;
        }
        if (alpha <= 0) return;
        // halo
        const grd = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, 18);
        grd.addColorStop(0, `rgba(232,184,109,${0.55 * alpha})`);
        grd.addColorStop(1, 'rgba(232,184,109,0)');
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(s.x, s.y, 18, 0, Math.PI * 2);
        ctx.fill();
        // star
        ctx.fillStyle = `rgba(244,236,216,${alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, 2.2, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    function drawThreads(now) {
      threads.forEach(th => {
        const p = th.dur > 0 ? Math.min(1, (now - th.t0) / th.dur) : 1;
        const x = th.a.x + (th.b.x - th.a.x) * p;
        const y = th.a.y + (th.b.y - th.a.y) * p;
        // line from a to (x,y)
        const grd = ctx.createLinearGradient(th.a.x, th.a.y, x, y);
        grd.addColorStop(0, 'rgba(232,184,109,0.05)');
        grd.addColorStop(1, 'rgba(232,184,109,0.6)');
        ctx.strokeStyle = grd;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(th.a.x, th.a.y);
        ctx.lineTo(x, y);
        ctx.stroke();
        // moving head
        ctx.fillStyle = '#E8B86D';
        ctx.beginPath();
        ctx.arc(x, y, 1.6, 0, Math.PI * 2);
        ctx.fill();
        if (p >= 1 && !th.done) {
          th.done = true;
          if (th.onContact) th.onContact();
        }
      });
    }

    function playNote() {
      if (State.prefs.sound !== 'soft') return;
      if (!audioReady) initAudio();
      if (!audio) return;
      const notes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33]; // pentatonic-ish
      const f = notes[Math.floor(Math.random() * notes.length)];
      const t0 = audio.currentTime;
      const osc = audio.createOscillator();
      const gain = audio.createGain();
      const filter = audio.createBiquadFilter();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, t0);
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, t0);
      gain.gain.setValueAtTime(0, t0);
      gain.gain.linearRampToValueAtTime(0.08, t0 + 0.4);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 4.0);
      osc.connect(filter); filter.connect(gain); gain.connect(audio.destination);
      osc.start(t0);
      osc.stop(t0 + 4.2);
    }

    function initAudio() {
      try {
        audio = new (window.AudioContext || window.webkitAudioContext)();
        audioReady = true;
      } catch (e) { audio = null; }
    }

    function render() {
      if (!initialized) return;
      if (!rafId) start();
    }

    function releaseStar(id) {
      const s = placed.find(p => p.id === id);
      if (!s) return;
      s.releasing = true;
      s.releaseStart = Date.now();
      if (!rafId) start();
      setTimeout(() => {
        placed = placed.filter(p => p.id !== id);
        State.sky = placed.slice();
        persist();
      }, 1500);
    }

    return { init, render, releaseStar, get initialized() { return initialized; } };
  })();

  // expose for applyLocale
  window._sky = Sky;
  window._breath = Breath;
  window._ground = Grounding;

  /* =========================================================
     9. BUBBLE FIELD
     ========================================================= */

  const Bubbles = (() => {
    let host, whisperEl;
    let used = new Set();

    function init() {
      host = document.getElementById('bubble-field');
      whisperEl = document.getElementById('bubble-whisper');
      if (!host) return;
      // 7 bubbles, varied sizes
      const sizes = [42, 56, 38, 70, 50, 46, 60];
      for (let i = 0; i < sizes.length; i++) {
        spawn(sizes[i], i);
      }
    }

    function spawn(size, i) {
      const b = document.createElement('div');
      b.className = 'bubble';
      const s = size + 'px';
      b.style.width = s; b.style.height = s;
      // avoid the central reading column (gutters only)
      const left = 4 + Math.random() * 10;          // 4–14vw
      const right = 4 + Math.random() * 10;          // mirrored
      const side = Math.random() < 0.5 ? 'left' : 'right';
      if (side === 'left') b.style.left = left + 'vw';
      else b.style.right = right + 'vw';
      b.style.top = (10 + Math.random() * 75) + 'vh';
      b.style.animationDuration = (10 + Math.random() * 10) + 's';
      b.style.animationDelay = (-Math.random() * 10) + 's';
      b.style.opacity = 0.0;
      b.style.transition = 'opacity 800ms ease';
      b.dataset.idx = i;
      host.appendChild(b);
      setTimeout(() => { b.style.opacity = 0.85; }, 200);

      b.addEventListener('click', (e) => pop(b, e));
    }

    function pop(b, ev) {
      if (b.classList.contains('popping')) return;
      State.bubblesCaught += 1;
      persist();
      b.classList.add('popping');
      // particles
      const rect = b.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      for (let i = 0; i < 8; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const ang = (i / 8) * Math.PI * 2 + Math.random() * 0.4;
        const dist = 30 + Math.random() * 30;
        p.style.left = cx + 'px';
        p.style.top = cy + 'px';
        p.style.position = 'fixed';
        p.style.setProperty('--dx', (Math.cos(ang) * dist) + 'px');
        p.style.setProperty('--dy', (Math.sin(ang) * dist) + 'px');
        const colors = ['#C9B8D8', '#E8B86D', '#7FB7B0', '#D89A9A'];
        p.style.background = colors[i % colors.length];
        document.body.appendChild(p);
        setTimeout(() => p.remove(), 800);
      }
      // whisper (no repeats in this session)
      let msg;
      let tries = 0;
      do {
        const wDict = WHISPERS[State.user.locale] || WHISPERS.en;
        msg = wDict.bubblePop[Math.floor(Math.random() * wDict.bubblePop.length)];
        tries++;
      } while (used.has(msg) && tries < 12);
      used.add(msg);
      whisperEl.textContent = msg;
      whisperEl.classList.add('show');
      clearTimeout(pop._t);
      pop._t = setTimeout(() => whisperEl.classList.remove('show'), 5500);
      // respawn after delay
      setTimeout(() => {
        b.classList.remove('popping');
        b.style.opacity = 0;
        b.style.transition = 'opacity 800ms ease';
        b.style.left = (4 + Math.random() * 92) + 'vw';
        b.style.top = (10 + Math.random() * 75) + 'vh';
        setTimeout(() => { b.style.opacity = 0.85; }, 200);
      }, 1200);
    }

    return { init };
  })();

  /* =========================================================
     10. HELPLINES RENDER
     ========================================================= */

  function helplineCard(h) {
    const div = document.createElement('div');
    div.className = 'help-card cat-' + h.cat;
    const tag = t('help.tag.' + (h.cat === 'community' ? 'community' : h.cat));
    const name = h.name;
    const tel = h.tel;
    const hours = h.hours || '';
    const meta = h.langs ? `${h.langs.join(' · ')} · ${hours}` : (h.desc_en ? `${State.user.locale === 'vi' ? (h.desc_vi || h.desc_en) : h.desc_en} · ${hours}` : hours);
    const communityLink = h.url ? `<a href="https://${h.url}" target="_blank" rel="noopener" class="text-teal underline underline-offset-2">${h.url}</a>` : '';
    div.innerHTML = `
      <div class="help-tag">${tag}</div>
      <div class="flex items-baseline gap-3 mt-1">
        <span class="help-num">${tel}</span>
        <span class="help-name">${name}</span>
      </div>
      <div class="help-meta">${meta} ${communityLink}</div>
    `;
    return div;
  }

  function renderHelplines(filter) {
    const f = (filter || '').toLowerCase().trim();

    // VN
    const vnHost = document.getElementById('helplines-vn');
    vnHost.innerHTML = '';
    HELPLINES.vietnam.forEach(h => vnHost.appendChild(helplineCard(h)));

    // Global
    const gHost = document.getElementById('helplines-global');
    gHost.innerHTML = '';
    HELPLINES.global
      .filter(h => !f || (h.country + ' ' + h.name).toLowerCase().includes(f))
      .forEach(h => {
        const div = document.createElement('div');
        div.className = 'help-card';
        div.innerHTML = `
          <div class="help-tag">${h.country}</div>
          <div class="flex items-baseline gap-3 mt-1">
            <span class="help-num">${h.tel}</span>
            <span class="help-name">${h.name}</span>
          </div>
          <div class="help-meta">${h.langs.join(' · ')} · ${h.hours}</div>
        `;
        gHost.appendChild(div);
      });
    if (gHost.children.length === 0) {
      gHost.innerHTML = `<p class="text-ink/50 font-serif italic col-span-2">${t('help.noMatch')}</p>`;
    }

    // Community
    const cHost = document.getElementById('helplines-community');
    cHost.innerHTML = '';
    HELPLINES.community.forEach(h => {
      const div = document.createElement('div');
      div.className = 'help-card cat-community';
      const focus = State.user.locale === 'vi' ? h.focus_vi : h.focus_en;
      div.innerHTML = `
        <div class="help-tag">${t('help.tag.community')} · ${h.region}</div>
        <div class="help-name text-lg mt-1">${h.name}</div>
        <div class="help-meta">${focus}</div>
        <div class="mt-2"><a href="https://${h.url}" target="_blank" rel="noopener" class="text-teal underline underline-offset-2">${h.url}</a></div>
      `;
      cHost.appendChild(div);
    });
  }

  /* =========================================================
     11. PROFILE: EXPORT / IMPORT / RESET
     ========================================================= */

  function exportProfile() {
    try {
      const blob = new Blob([JSON.stringify(State, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      const date = new Date().toISOString().slice(0, 10);
      a.href = url;
      a.download = `being- enough-${date}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (e) {
      alert(t('export.fail'));
    }
  }

  function importProfile(file) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        if (!parsed || parsed.v !== 2) throw new Error('bad');
        State = parsed;
        persist();
        applyTheme();
        applyLocale();
        renderGreeting();
        renderMoodChips();
        alert(t('import.ok'));
      } catch (e) {
        alert(t('import.fail'));
      }
    };
    reader.readAsText(file);
  }

  function resetProfile() {
    if (!confirm(t('reset.confirm'))) return;
    localStorage.removeItem(STORAGE_KEY);
    State = defaultState();
    State.user.visitCount = 0;
    State.user.firstVisitSeen = true; // don't re-show note
    persist();
    applyTheme();
    applyLocale();
    renderGreeting();
    renderMoodChips();
    // reload to clean state
    setTimeout(() => location.reload(), 800);
  }

  /* =========================================================
     12. TAP QUIET (Canvas mini-game)
     ========================================================= */

  const TapQuiet = (() => {
    let canvas, ctx, w, h, dpr;
    let rafId = null;
    let running = false;

    let reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Flower animation state
    let flower = { x: 0, y: 0, r: 20, t0: 0, cycle: 0, open: 0 }; // open: 0..1
    let targetOpenAt = 0; // seconds offset within cycle
    let userTappedAt = null;
    let lastTapAt = 0;

    // Pointer/tap interactions
    let pointerDown = false;

    let observer = null;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      w = Math.max(1, rect.width);
      h = Math.max(1, rect.height);
      dpr = window.devicePixelRatio || 1;

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      flower.x = w * 0.5;
      flower.y = h * 0.53;
      flower.r = Math.min(26, Math.max(16, Math.min(w, h) * 0.075));
    }

    function resetFlower(newCycle = true) {
      if (newCycle) flower.cycle += 1;
      flower.t0 = Date.now();
      flower.open = 0;
      userTappedAt = null;

      // Gentle cycle length
      const cycleMs = reduce ? 1300 : 2400;
      const targetMs = reduce ? 650 : (cycleMs * (0.45 + Math.random() * 0.12)); // ~gentle window
      targetOpenAt = targetMs / 1000;

      running = true;
      setStatus(t('tap.status.on'));
    }

    function setStatus(text) {
      const el = document.getElementById('tap-status');
      if (el) el.textContent = text;
    }

    function draw(now) {
      if (!ctx) return;

      ctx.clearRect(0, 0, w, h);

      // Soft paper background shimmer
      ctx.fillStyle = State.prefs.theme === 'night'
        ? 'rgba(37,35,64,0.10)'
        : 'rgba(251,246,233,0.10)';
      ctx.fillRect(0, 0, w, h);

      // Baseline (subtle)
      ctx.strokeStyle = State.prefs.theme === 'night'
        ? 'rgba(232,231,210,0.08)'
        : 'rgba(42,37,34,0.08)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(w * 0.12, h * 0.78);
      ctx.quadraticCurveTo(w * 0.5, h * 0.72, w * 0.88, h * 0.78);
      ctx.stroke();

      const elapsed = (now - flower.t0) / 1000;

      const cycleSeconds = reduce ? 1.3 : 2.4;
      const p = Math.max(0, Math.min(1, elapsed / cycleSeconds));

      // Open animation: bloom in then relax
      const bloom = Math.sin(Math.min(Math.PI, p * Math.PI)) * (reduce ? 0.9 : 1);
      flower.open = bloom;

      // Flower center
      const alpha = State.prefs.theme === 'night' ? 0.9 : 1.0;

      // Petals (rings) respond to open progress
      const petals = 8;
      for (let i = 0; i < petals; i++) {
        const a = (i / petals) * Math.PI * 2;
        const petalLen = flower.r * (0.55 + flower.open * 0.9);
        const px = flower.x + Math.cos(a) * (flower.r * 0.12);
        const py = flower.y + Math.sin(a) * (flower.r * 0.12);
        const tipX = flower.x + Math.cos(a) * petalLen;
        const tipY = flower.y + Math.sin(a) * petalLen;

        const grd = ctx.createLinearGradient(px, py, tipX, tipY);
        grd.addColorStop(0, `rgba(232,184,109,${0.25 * alpha})`);
        grd.addColorStop(1, `rgba(127,183,176,${0.18 * alpha})`);
        ctx.strokeStyle = grd;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.quadraticCurveTo(
          flower.x + Math.cos(a) * (flower.r * (0.7 + flower.open * 0.35)),
          flower.y + Math.sin(a) * (flower.r * (0.7 + flower.open * 0.35)),
          tipX,
          tipY
        );
        ctx.stroke();
      }

      // Center “seed”
      ctx.beginPath();
      ctx.fillStyle = State.prefs.theme === 'night'
        ? `rgba(244,236,216,${0.18 + flower.open * 0.35})`
        : `rgba(42,37,34,${0.08 + flower.open * 0.18})`;
      ctx.arc(flower.x, flower.y, flower.r * (0.30 + flower.open * 0.18), 0, Math.PI * 2);
      ctx.fill();

      // If we reached the end of cycle, prepare next gentle cycle (no score, continuous)
      if (elapsed >= cycleSeconds) {
        // keep it gentle: only auto-reset if running
        if (running) resetFlower(true);
      }

      // Target timing marker after open (very subtle)
      const targetPx = flower.r * (0.95 + flower.open * 0.15);
      const markerAlpha = reduce ? 0.0 : Math.max(0, 0.45 - Math.abs(elapsed - targetOpenAt) * 2.2);
      if (markerAlpha > 0.001) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(232,184,109,${0.12 * markerAlpha})`;
        ctx.lineWidth = 2;
        ctx.arc(flower.x, flower.y, targetPx, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    function tick(now) {
      rafId = requestAnimationFrame(tick);
      if (!running) return;
      draw(now);
    }

    function startLoop() {
      if (rafId) return;
      rafId = requestAnimationFrame(tick);
    }

    function stopLoop() {
      if (!rafId) return;
      cancelAnimationFrame(rafId);
      rafId = null;
    }

    function onUserTap() {
      if (!running) return;
      const now = Date.now();
      lastTapAt = now;

      const elapsedSec = (now - flower.t0) / 1000;
      userTappedAt = elapsedSec;

      // Gentle “feedback”: if close to target, we do a quick pulse by restarting immediately
      const diff = Math.abs(elapsedSec - targetOpenAt);
      const ok = diff < (reduce ? 0.18 : 0.22);

      const status = ok
        ? (State.user.locale === 'vi' ? 'đã chạm đúng nhịp.' : 'you touched the bloom.')
        : (State.user.locale === 'vi' ? 'đã chạm.' : 'you touched.');
      setStatus(status);

      // Briefly pause auto reset and then restart
      running = true;
      flower.t0 = Date.now();
      flower.open = reduce ? 0.6 : Math.min(1, 0.35 + flower.open * 0.35);
      targetOpenAt = (reduce ? 0.65 : 1.05); // next window closer
      setTimeout(() => {
        if (running) resetFlower(true);
      }, reduce ? 140 : 320);
    }

    function bind() {
      const toggle = document.getElementById('tap-toggle');
      const resetBtn = document.getElementById('tap-reset');

      if (!toggle || !resetBtn || !canvas) return;

      toggle.addEventListener('click', () => {
        resetFlower(true);
        running = true;
        startLoop();
      });

      resetBtn.addEventListener('click', () => {
        running = false;
        setStatus(t('tap.status.idle'));
        stopLoop();
        flower.open = 0;
      });

      const handle = (ev) => {
        // Respect buttons/keyboard; only for touch/click/tap on canvas
        ev.preventDefault?.();
        onUserTap();
      };

      canvas.addEventListener('pointerdown', handle, { passive: false });

      // Improve mobile UX: keep “tap” responsive without scrolling
      canvas.style.touchAction = 'manipulation';
    }

    function init() {
      canvas = document.getElementById('tap-canvas');
      if (!canvas) return;
      ctx = canvas.getContext('2d');
      if (!ctx) return;

      resize();
      window.addEventListener('resize', resize);

      // initial UI state
      setStatus(t('tap.status.idle'));
      running = false;

      bind();

      observer = new IntersectionObserver(entries => {
        entries.forEach(en => {
          if (!running) return;
          if (!reduce && !en.isIntersecting) {
            // pause
            running = false;
            stopLoop();
            setStatus(t('tap.status.idle'));
          } else if (en.isIntersecting) {
            // resume in a gentle state
            setTimeout(() => {
              if (document.hidden) return;
              running = true;
              startLoop();
            }, 0);
          }
        });
      }, { threshold: 0.08 });

      observer.observe(canvas);
    }

    return { init };
  })();

  /* =========================================================
     13. PAPER WIND (Canvas mini-game)
     ========================================================= */

  const PaperWind = (() => {
    let canvas, ctx, w, h, dpr;
    let rafId = null;

    let reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let paused = false;

    let pieces = []; // {x,y,vx,vy,spin,age,seed}
    let pointer = { x: 0, y: 0, vx: 0, vy: 0, lastX: 0, lastY: 0, lastT: 0 };

    let observer = null;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      w = Math.max(1, rect.width);
      h = Math.max(1, rect.height);
      dpr = window.devicePixelRatio || 1;

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function setStatus(text) {
      const el = document.getElementById('wind-status');
      if (el) el.textContent = text;
    }

    function spawnBurst(n = 6) {
      const count = reduce ? Math.min(4, n) : n;
      for (let i = 0; i < count; i++) {
        const x = pointer.x + (Math.random() - 0.5) * 18;
        const y = pointer.y + (Math.random() - 0.5) * 14;
        const seed = Math.random();
        const speed = reduce ? 0.4 : (0.6 + seed * 0.9);
        const angle = Math.atan2(pointer.vy, pointer.vx) + (Math.random() - 0.5) * 0.9;

        pieces.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed + (reduce ? 0.08 : 0.14),
          spin: (Math.random() - 0.5) * (reduce ? 2 : 4),
          age: 0,
          life: reduce ? 2200 : 3800,
          seed
        });
      }
    }

    function clear() {
      pieces = [];
      ctx && ctx.clearRect(0, 0, w, h);
      setStatus(t('wind.status.on'));
    }

    function updatePointer(ev) {
      const rect = canvas.getBoundingClientRect();
      const x = ev.clientX - rect.left;
      const y = ev.clientY - rect.top;

      const now = performance.now();
      if (pointer.lastT) {
        const dt = Math.max(16, now - pointer.lastT);
        const dx = x - pointer.lastX;
        const dy = y - pointer.lastY;
        pointer.vx = dx / dt;
        pointer.vy = dy / dt;
      }
      pointer.x = x;
      pointer.y = y;
      pointer.lastX = x;
      pointer.lastY = y;
      pointer.lastT = now;
    }

    function draw(now) {
      ctx.clearRect(0, 0, w, h);

      // background glow
      const baseAlpha = State.prefs.theme === 'night' ? 0.09 : 0.07;
      ctx.fillStyle = `rgba(232,184,109,${baseAlpha})`;
      ctx.fillRect(0, 0, w, h);

      // Draw pieces
      for (const p of pieces) {
        const t = p.age / p.life;
        const fade = Math.max(0, 1 - t);
        const size = (reduce ? 10 : 12) + p.seed * 10;
        const curl = p.seed * 0.6 + t * 1.2;

        const grad = ctx.createLinearGradient(p.x - size, p.y, p.x + size, p.y);
        grad.addColorStop(0, State.prefs.theme === 'night' ? `rgba(201,184,216,${0.38 * fade})` : `rgba(201,184,216,${0.30 * fade})`);
        grad.addColorStop(1, State.prefs.theme === 'night' ? `rgba(127,183,176,${0.34 * fade})` : `rgba(127,183,176,${0.26 * fade})`);

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.spin + curl);
        ctx.globalAlpha = 1;

        ctx.fillStyle = grad;
        ctx.strokeStyle = State.prefs.theme === 'night' ? `rgba(244,236,216,${0.10 * fade})` : `rgba(42,37,34,${0.08 * fade})`;
        ctx.lineWidth = 1;

        // Simple “paper strip” shape
        ctx.beginPath();
        ctx.moveTo(-size * 0.6, -size * 0.1);
        ctx.quadraticCurveTo(0, -size * 0.8, size * 0.7, -size * 0.05);
        ctx.quadraticCurveTo(size * 0.3, size * 0.7, -size * 0.6, size * 0.1);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // little crease line
        ctx.strokeStyle = State.prefs.theme === 'night' ? `rgba(232,184,109,${0.14 * fade})` : `rgba(232,184,109,${0.11 * fade})`;
        ctx.beginPath();
        ctx.moveTo(-size * 0.3, -size * 0.05);
        ctx.quadraticCurveTo(0, size * 0.18, size * 0.28, -size * 0.03);
        ctx.stroke();

        ctx.restore();
      }
    }

    function tick(now) {
      rafId = requestAnimationFrame(tick);
      if (paused) return;

      // physics step
      for (const p of pieces) {
        p.age += 16.6;

        // Pointer influence (“wind”)
        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const dist = Math.max(20, Math.hypot(dx, dy));
        const influence = reduce ? 0.0018 : 0.0028;

        const ax = (pointer.vx) * (140 / dist) * influence * 1000;
        const ay = (pointer.vy) * (140 / dist) * influence * 1000 + (reduce ? 0.002 : 0.004);

        p.vx += ax;
        p.vy += ay;

        // damping + movement
        p.vx *= reduce ? 0.992 : 0.988;
        p.vy *= reduce ? 0.992 : 0.985;

        p.x += p.vx * (reduce ? 10 : 12);
        p.y += p.vy * (reduce ? 10 : 12);

        // wrap / bounds fade
      }

      // prune dead pieces
      pieces = pieces.filter(p => p.age < p.life && p.y < h + 60);

      // spawn occasionally based on movement speed
      if (!reduce && Math.hypot(pointer.vx, pointer.vy) > 0.08 && pieces.length < 30) {
        spawnBurst(4);
      }

      draw(now);
    }

    function startLoop() {
      if (rafId) return;
      rafId = requestAnimationFrame(tick);
    }
    function stopLoop() {
      if (!rafId) return;
      cancelAnimationFrame(rafId);
      rafId = null;
    }

    function bind() {
      const pauseBtn = document.getElementById('wind-pause');
      const clearBtn = document.getElementById('wind-clear');

      if (!pauseBtn || !clearBtn || !canvas) return;

      setStatus(t('wind.status.on'));
      pauseBtn.textContent = t('wind.pause');

      pauseBtn.addEventListener('click', () => {
        paused = !paused;
        pauseBtn.textContent = t('wind.pause');
        setStatus(paused ? (State.user.locale === 'vi' ? 'đang tạm dừng.' : 'paused.') : t('wind.status.on'));
        if (!paused) startLoop();
      });

      clearBtn.addEventListener('click', () => clear());

      canvas.style.touchAction = 'none';

      // Pointer-driven wind
      canvas.addEventListener('pointermove', (ev) => {
        updatePointer(ev);

        if (pieces.length === 0) {
          // create initial pieces gently
          pointer.lastT = performance.now();
          spawnBurst(7);
          startLoop();
        } else if (!reduce && Math.hypot(pointer.vx, pointer.vy) > 0.09 && pieces.length < 36) {
          spawnBurst(3);
        }
      }, { passive: true });

      // Make taps spawn a soft burst too
      canvas.addEventListener('pointerdown', (ev) => {
        updatePointer(ev);
        spawnBurst(8);
        startLoop();
      });
    }

    function init() {
      canvas = document.getElementById('wind-canvas');
      if (!canvas) return;
      ctx = canvas.getContext('2d');
      if (!ctx) return;

      resize();
      window.addEventListener('resize', resize);

      bind();
      clear();

      // Start with gentle pointer position
      const rect = canvas.getBoundingClientRect();
      pointer.x = rect.width * 0.5;
      pointer.y = rect.height * 0.55;
      pointer.lastX = pointer.x;
      pointer.lastY = pointer.y;
      pointer.lastT = 0;

      observer = new IntersectionObserver(entries => {
        entries.forEach(en => {
          if (!en.isIntersecting) {
            paused = true;
            stopLoop();
            setStatus(t('wind.status.on'));
          } else {
            paused = false;
            if (pieces.length > 0) startLoop();
          }
        });
      }, { threshold: 0.1 });

      observer.observe(canvas);
    }

    return { init };
  })();

  /* =========================================================
     12. BOOT
     ========================================================= */

  function bindTopBar() {
    const localeBtn = document.getElementById('locale-toggle');
    localeBtn.addEventListener('click', () => {
      State.user.locale = State.user.locale === 'en' ? 'vi' : 'en';
      persist();
      applyLocale();
    });

    const themeBtn = document.getElementById('theme-toggle');
    themeBtn.addEventListener('click', () => {
      State.prefs.theme = State.prefs.theme === 'wheat' ? 'night' : 'wheat';
      persist();
      applyTheme();
    });

    const moonBtn = document.getElementById('moon-btn');
    moonBtn.addEventListener('click', () => {
      State.prefs.sound = State.prefs.sound === 'soft' ? 'off' : 'soft';
      persist();
      moonBtn.classList.toggle('active', State.prefs.sound === 'soft');
      const label = moonBtn.querySelector('span');
      label.textContent = State.prefs.sound === 'soft' ? t('sky.silenced') : t('sky.letSing');
    });
  }

  function bindCover() {
    const begin = document.getElementById('begin-btn');
    const skip = document.getElementById('begin-skip');
    const input = document.getElementById('name-input');
    input.value = State.user.name || '';
    begin.addEventListener('click', () => {
      const v = input.value.trim().slice(0, 32);
      State.user.name = v || null;
      persist();
      document.getElementById('greeting').scrollIntoView({ behavior: 'smooth' });
      renderGreeting();
    });
    skip.addEventListener('click', () => {
      State.user.name = null;
      input.value = '';
      persist();
      document.getElementById('greeting').scrollIntoView({ behavior: 'smooth' });
      renderGreeting();
    });
  }

  function bindFooter() {
    document.getElementById('reread-note').addEventListener('click', () => {
      document.getElementById('note-modal').classList.remove('hidden');
    });
    document.getElementById('export-profile').addEventListener('click', exportProfile);
    document.getElementById('import-profile').addEventListener('click', () => {
      document.getElementById('import-file').click();
    });
    document.getElementById('import-file').addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) importProfile(e.target.files[0]);
      e.target.value = '';
    });
    document.getElementById('reset-profile').addEventListener('click', resetProfile);
  }

  function bindHelplineSearch() {
    const input = document.getElementById('helpline-search');
    input.addEventListener('input', () => renderHelplines(input.value));
  }

  function boot() {
    applyTheme();
    initAmbient();
    bindTopBar();
    bindCover();
    bindMood();
    bindTea();
    bindPlant();
    bindLamp();
    bindFooter();
    bindHelplineSearch();
    renderHelplines();
    applyLocale();          // also calls renderGreeting + renderMoodChips
    Breath.init();
    Grounding.init();
    Garden.init();
    Sky.init();

    // Mini-games (Tap Quiet + Paper Wind)
    TapQuiet.init();
    PaperWind.init();

    Bubbles.init();
    maybeShowNote();
    persist();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
