// ═══════════════════════════════════════════════════════════════
//  firebase.js  —  OsyTrade  |  Firebase v8 compat
// ═══════════════════════════════════════════════════════════════

const firebaseConfig = {
  apiKey:            "AIzaSyDqoEg0Hgve1P0gsqHrT5KhOXJ-_jf9u_k",
  authDomain:        "ofesnaser-b5124.firebaseapp.com",
  projectId:         "ofesnaser-b5124",
  storageBucket:     "ofesnaser-b5124.firebasestorage.app",
  messagingSenderId: "778438221496",
  appId:             "1:778438221496:web:f296541182800343361e4d",
  measurementId:     "G-G586ZSN7R1"
};

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

const auth    = firebase.auth();
const db      = firebase.firestore();
const storage = firebase.storage();

// ─────────────────────────────────────────────────────────
//  THEME
// ─────────────────────────────────────────────────────────
const getTheme   = () => localStorage.getItem('et_theme') || 'dark';
const initTheme  = () => { document.documentElement.dataset.theme = getTheme(); };
const toggleTheme = () => setTheme(getTheme() === 'dark' ? 'light' : 'dark');
function setTheme(t) {
  localStorage.setItem('et_theme', t);
  document.documentElement.dataset.theme = t;
  document.querySelectorAll('[data-theme-icon]').forEach(el => el.textContent = t==='dark'?'☀️':'🌙');
  document.querySelectorAll('[data-t="theme_toggle"]').forEach(el => el.textContent = tr(t==='dark'?'light_mode':'dark_mode'));
}

// ─────────────────────────────────────────────────────────
//  LANGUAGE
// ─────────────────────────────────────────────────────────
const getLang  = () => localStorage.getItem('et_lang') || 'en';
const toggleLang = () => setLang(getLang()==='en'?'ar':'en');
function initLang() {
  const l = getLang();
  document.documentElement.lang = l;
  document.documentElement.dir  = l==='ar'?'rtl':'ltr';
}
function setLang(l) {
  localStorage.setItem('et_lang', l);
  document.documentElement.lang = l;
  document.documentElement.dir  = l==='ar'?'rtl':'ltr';
  applyTranslations();
}

// ─────────────────────────────────────────────────────────
//  TRANSLATIONS
// ─────────────────────────────────────────────────────────
const I18N = {
  en: {
    home:'Home', market:'Market', add:'Add', chat:'Chat', profile:'Profile',
    login:'Login', logout:'Logout', register:'Register',
    loading:'Loading…', error:'Something went wrong.',
    hero_title:'Trade Tools.\nTrade Green.', hero_sub:'Premium eco-certified marketplace for tools & equipment.',
    browse:'Browse Categories', featured:'⭐ Featured', view_deal:'View Deal',
    popular:'Popular Listings', eco_certified:'ECO CERTIFIED · TOOLS',
    all:'All', tools:'🔧 Tools', machines:'⚙️ Machines', eco:'🌿 Eco', electrical:'⚡ Electrical', garden:'🌱 Garden',
    listings:'Listings', eco_score:'Eco Score', sellers:'Sellers',
    trade_green:'Trade Green, Trade Smart', trade_green_sub:'Every listing is verified for environmental standards.',
    go_market:'Browse Market →',
    email:'Email address', password:'Password', username:'Username', confirm_password:'Confirm password',
    sign_in:'Sign In', sign_up:'Create Account', sign_in_google:'Continue with Google',
    sign_in_guest:'Continue as Guest', have_account:'Already have an account?', no_account:"Don't have an account?",
    forgot:'Forgot password?', or:'or',
    my_profile:'My Profile', member_since:'Member since', edit_username:'Edit Username', save:'Save', cancel:'Cancel',
    update_success:'Profile updated!', logout_confirm:'Are you sure you want to logout?',
    all_users:'All Members', online_users:'Online Now', start_chat:'Message',
    online:'Online', offline:'Offline', last_seen:'Last seen', search_users:'Search users…', no_users:'No users found.',
    type_message:'Type a message…', send:'Send', attach:'Attach file', voice_msg:'Voice message',
    no_messages:'No messages yet. Say hello! 👋', today:'Today', yesterday:'Yesterday',
    about:'About', contact:'Contact', light_mode:'Light Mode', dark_mode:'Dark Mode', theme_toggle:'Light Mode',
    unit:'/ unit', eco_label:'🌿 Eco', back:'← Back',
    search:'Search products…', no_products:'No products found.', add_product:'Add Product',
    product_name:'Product name', product_desc:'Description', product_price:'Price (e.g. 49.99)',
    product_category:'Category', product_image:'Product Image', upload_image:'Upload image',
    submit:'Submit Listing', uploading:'Uploading…', success:'Product listed!',
    my_listings:'My Listings', my_favorites:'My Favorites', no_listings:'No listings yet.',
    buy:'Buy Now', add_to_fav:'Add to favorites', remove_fav:'Remove from favorites',
    checkout:'Checkout', order_placed:'Order placed! 🎉', checkout_title:'Complete Purchase',
    pay_now:'Confirm & Pay', subtotal:'Subtotal', shipping:'Shipping', total:'Total',
    delivery_info:'Delivery Information', name_on_card:'Name', address:'Address', city:'City',
    messages:'Messages', new_message:'New message', search_chats:'Search chats…',
    no_chats:'No conversations yet.', typing:'typing…', seen:'Seen',
    voice_note:'Voice note', image_msg:'📷 Image', recording:'🔴 Recording…',
  },
  ar: {
    home:'الرئيسية', market:'السوق', add:'إضافة', chat:'الدردشة', profile:'حسابي',
    login:'تسجيل الدخول', logout:'تسجيل الخروج', register:'إنشاء حساب',
    loading:'جاري التحميل…', error:'حدث خطأ ما.',
    hero_title:'تداول الأدوات.\nتداول باحترافية.', hero_sub:'السوق المتميز للأدوات والمعدات المعتمدة بيئياً.',
    browse:'تصفح الفئات', featured:'⭐ مميز', view_deal:'عرض الصفقة',
    popular:'الإعلانات الشائعة', eco_certified:'معتمد بيئياً · أدوات',
    all:'الكل', tools:'🔧 أدوات', machines:'⚙️ آلات', eco:'🌿 بيئي', electrical:'⚡ كهربائي', garden:'🌱 حديقة',
    listings:'إعلان', eco_score:'النتيجة البيئية', sellers:'بائع',
    trade_green:'تداول أخضر، تداول ذكي', trade_green_sub:'كل إعلان يخضع لمعايير بيئية صارمة.',
    go_market:'تصفح السوق ←',
    email:'البريد الإلكتروني', password:'كلمة المرور', username:'اسم المستخدم', confirm_password:'تأكيد كلمة المرور',
    sign_in:'تسجيل الدخول', sign_up:'إنشاء حساب', sign_in_google:'المتابعة مع Google',
    sign_in_guest:'المتابعة كضيف', have_account:'لديك حساب؟', no_account:'ليس لديك حساب؟',
    forgot:'نسيت كلمة المرور؟', or:'أو',
    my_profile:'ملفي الشخصي', member_since:'عضو منذ', edit_username:'تعديل الاسم', save:'حفظ', cancel:'إلغاء',
    update_success:'تم التحديث!', logout_confirm:'هل تريد تسجيل الخروج؟',
    all_users:'جميع الأعضاء', online_users:'متصل الآن', start_chat:'مراسلة',
    online:'متصل', offline:'غير متصل', last_seen:'آخر ظهور', search_users:'ابحث…', no_users:'لا مستخدمين.',
    type_message:'اكتب رسالة…', send:'إرسال', attach:'إرفاق', voice_msg:'رسالة صوتية',
    no_messages:'لا رسائل بعد. قل مرحباً! 👋', today:'اليوم', yesterday:'أمس',
    about:'من نحن', contact:'تواصل معنا', light_mode:'الوضع الفاتح', dark_mode:'الوضع الداكن', theme_toggle:'الوضع الفاتح',
    unit:'/ وحدة', eco_label:'🌿 بيئي', back:'رجوع ←',
    search:'ابحث عن منتج…', no_products:'لا منتجات.', add_product:'إضافة منتج',
    product_name:'اسم المنتج', product_desc:'الوصف', product_price:'السعر',
    product_category:'الفئة', product_image:'صورة المنتج', upload_image:'رفع صورة',
    submit:'نشر الإعلان', uploading:'جاري الرفع…', success:'تم النشر!',
    my_listings:'إعلاناتي', my_favorites:'المفضلة', no_listings:'لا إعلانات بعد.',
    buy:'شراء الآن', add_to_fav:'إضافة للمفضلة', remove_fav:'إزالة من المفضلة',
    checkout:'الدفع', order_placed:'تم الطلب! 🎉', checkout_title:'إتمام الشراء',
    pay_now:'تأكيد الدفع', subtotal:'المجموع', shipping:'الشحن', total:'الإجمالي',
    delivery_info:'معلومات التوصيل', name_on_card:'الاسم', address:'العنوان', city:'المدينة',
    messages:'الرسائل', new_message:'رسالة جديدة', search_chats:'ابحث في الدردشات…',
    no_chats:'لا محادثات بعد.', typing:'يكتب…', seen:'مُشاهَد',
    voice_note:'رسالة صوتية', image_msg:'📷 صورة', recording:'🔴 جاري التسجيل…',
  }
};

function tr(key) {
  const l = getLang();
  return I18N[l]?.[key] ?? I18N.en?.[key] ?? key;
}

function applyTranslations() {
  document.querySelectorAll('[data-t]').forEach(el => {
    const v = tr(el.dataset.t);
    if (['INPUT','TEXTAREA'].includes(el.tagName)) el.placeholder = v;
    else el.textContent = v;
  });
  document.querySelectorAll('[data-tp]').forEach(el => el.placeholder = tr(el.dataset.tp));
  document.querySelectorAll('[data-t="theme_toggle"]').forEach(el => el.textContent = tr(getTheme()==='dark'?'light_mode':'dark_mode'));
  document.querySelectorAll('[data-theme-icon]').forEach(el => el.textContent = getTheme()==='dark'?'☀️':'🌙');
}

// ─────────────────────────────────────────────────────────
//  SHARED CSS (injected into every page)
// ─────────────────────────────────────────────────────────
function injectSharedCSS() {
  if (document.getElementById('et-shared-css')) return;
  const style = document.createElement('style');
  style.id = 'et-shared-css';
  style.textContent = `
    :root {
      --navy:#020617;--navy-2:#0a1628;--navy-3:#0f1f38;
      --accent:#22d3ee;--accent2:#6ee7b7;--accent3:#818cf8;
      --glass:rgba(255,255,255,.055);--glass-border:rgba(255,255,255,.10);
      --glass-strong:rgba(255,255,255,.11);
      --text-primary:#f0f6ff;--text-secondary:rgba(200,220,255,.60);
      --card-bg:rgba(15,31,56,.75);--nav-bg:rgba(2,6,23,.88);
      --shadow-glow:0 0 40px rgba(34,211,238,.10);
      --bottom-nav-h:76px;
    }
    [data-theme=light] {
      --navy:#f0f6ff;--navy-2:#e4edfa;--navy-3:#d6e4f7;
      --accent:#0891b2;--accent2:#059669;--accent3:#6366f1;
      --glass:rgba(2,6,23,.05);--glass-border:rgba(2,6,23,.10);
      --glass-strong:rgba(2,6,23,.08);
      --text-primary:#020617;--text-secondary:rgba(2,6,23,.50);
      --card-bg:rgba(255,255,255,.72);--nav-bg:rgba(240,246,255,.92);
    }
    *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; -webkit-tap-highlight-color:transparent; }
    ::-webkit-scrollbar { width:5px; height:5px; }
    ::-webkit-scrollbar-track { background:transparent; }
    ::-webkit-scrollbar-thumb { background:var(--glass-border); border-radius:999px; }
    html, body { font-family:'Plus Jakarta Sans',sans-serif; background:var(--navy); color:var(--text-primary); transition:background .4s,color .4s; min-height:100vh; }
    [dir=rtl] * { font-family:'Cairo',sans-serif; }
    [dir=ltr] * { font-family:'Plus Jakarta Sans',sans-serif; }

    .bg-mesh { position:fixed; inset:0; pointer-events:none; z-index:0; background:var(--navy); transition:background .4s; }
    .bg-mesh::before { content:''; position:absolute; inset:0; background:
      radial-gradient(ellipse 60% 50% at 20% 10%,rgba(34,211,238,.10) 0%,transparent 70%),
      radial-gradient(ellipse 50% 40% at 80% 80%,rgba(110,231,183,.08) 0%,transparent 60%),
      radial-gradient(ellipse 40% 35% at 60% 30%,rgba(139,92,246,.06) 0%,transparent 60%); }
    [data-theme=light] .bg-mesh::before { background:
      radial-gradient(ellipse 60% 50% at 20% 10%,rgba(8,145,178,.07) 0%,transparent 70%),
      radial-gradient(ellipse 50% 40% at 80% 80%,rgba(5,150,105,.05) 0%,transparent 60%); }

    .glass-card { background:var(--card-bg); border:1px solid var(--glass-border); backdrop-filter:blur(24px) saturate(170%); -webkit-backdrop-filter:blur(24px) saturate(170%); }
    .glass { background:var(--glass); border:1px solid var(--glass-border); backdrop-filter:blur(16px); -webkit-backdrop-filter:blur(16px); }

    .icon-btn { width:38px; height:38px; border-radius:50%; border:1px solid var(--glass-border); background:var(--glass); cursor:pointer; display:flex; align-items:center; justify-content:center; color:var(--text-primary); font-size:15px; outline:none; transition:all .22s cubic-bezier(.34,1.56,.64,1); flex-shrink:0; text-decoration:none; }
    .icon-btn:hover { border-color:var(--accent); box-shadow:0 0 0 1px var(--accent); }
    .icon-btn:active { transform:scale(.87); }

    .btn-grad { padding:12px 28px; border-radius:999px; border:none; cursor:pointer; background:linear-gradient(135deg,var(--accent),var(--accent2)); color:#020617; font-size:14px; font-weight:700; font-family:inherit; box-shadow:0 6px 22px rgba(34,211,238,.30); transition:all .25s cubic-bezier(.34,1.56,.64,1); }
    .btn-grad:hover { transform:scale(1.05); box-shadow:0 10px 32px rgba(34,211,238,.45); }
    .btn-grad:active { transform:scale(.93); }
    .btn-grad:disabled { opacity:.5; pointer-events:none; }
    .btn-outline { padding:12px 28px; border-radius:999px; border:1px solid var(--glass-border); background:var(--glass); color:var(--text-primary); font-size:14px; font-weight:600; font-family:inherit; cursor:pointer; transition:all .25s; text-decoration:none; display:inline-flex; align-items:center; }
    .btn-outline:hover { border-color:var(--accent); color:var(--accent); }
    .btn-outline:active { transform:scale(.93); }

    .form-input { width:100%; padding:12px 16px; background:var(--glass); border:1px solid var(--glass-border); border-radius:14px; outline:none; font-size:14px; color:var(--text-primary); font-family:inherit; backdrop-filter:blur(12px); transition:border-color .22s,box-shadow .22s,background .22s; caret-color:var(--accent); }
    .form-input::placeholder { color:var(--text-secondary); font-family:inherit; }
    .form-input:focus { border-color:rgba(34,211,238,.45); background:var(--glass-strong); box-shadow:0 0 0 3px rgba(34,211,238,.08); }
    .form-label { display:block; font-size:11px; font-weight:700; letter-spacing:.09em; text-transform:uppercase; color:var(--text-secondary); margin-bottom:7px; }

    .section-title { font-size:11px; font-weight:700; letter-spacing:.14em; text-transform:uppercase; color:var(--text-secondary); }
    .page-title { font-size:22px; font-weight:800; letter-spacing:-.03em; }

    .logo-text { font-size:18px; font-weight:800; letter-spacing:-.04em; background:linear-gradient(135deg,var(--accent),var(--accent2)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; cursor:pointer; user-select:none; text-decoration:none; white-space:nowrap; }

    .fade-up { opacity:0; transform:translateY(22px); transition:opacity .5s ease,transform .5s cubic-bezier(.34,1.56,.64,1); }
    .fade-up.visible { opacity:1; transform:translateY(0); }

    .page-header { position:fixed; top:0; left:0; right:0; z-index:100; background:var(--nav-bg); border-bottom:1px solid var(--glass-border); backdrop-filter:blur(28px) saturate(180%); -webkit-backdrop-filter:blur(28px) saturate(180%); transition:background .4s; animation:ph-in .42s cubic-bezier(.34,1.56,.64,1) both; }
    @keyframes ph-in { from{transform:translateY(-100%);opacity:0} to{transform:translateY(0);opacity:1} }
    .ph-inner { display:flex; align-items:center; justify-content:space-between; padding:0 20px; height:62px; max-width:1280px; margin:0 auto; gap:16px; }
    .ph-actions { display:flex; align-items:center; gap:8px; }

    .desk-nav { display:flex; gap:4px; flex:1; }
    .desk-nav-link { padding:8px 16px; border-radius:12px; font-size:14px; font-weight:600; color:var(--text-secondary); text-decoration:none; cursor:pointer; border:none; background:transparent; font-family:inherit; transition:all .22s; }
    .desk-nav-link:hover, .desk-nav-link.active { color:var(--text-primary); background:var(--glass); }
    .desk-nav-link.active { color:var(--accent); }
    .nav-avatar { width:34px; height:34px; border-radius:50%; background:linear-gradient(135deg,var(--accent),var(--accent2)); display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:800; color:#020617; cursor:pointer; text-decoration:none; overflow:hidden; border:2px solid var(--glass-border); flex-shrink:0; transition:all .22s; }
    .nav-avatar img { width:100%; height:100%; object-fit:cover; }
    .nav-avatar:hover { box-shadow:0 0 0 2px var(--accent); }

    .dropdown { position:fixed; top:70px; z-index:500; min-width:210px; border-radius:20px; overflow:hidden; background:var(--card-bg); border:1px solid var(--glass-border); backdrop-filter:blur(32px); -webkit-backdrop-filter:blur(32px); box-shadow:0 24px 64px rgba(0,0,0,.4); transform-origin:top right; transform:scale(.88) translateY(-10px); opacity:0; pointer-events:none; transition:all .28s cubic-bezier(.34,1.56,.64,1); }
    [dir=rtl] .dropdown { transform-origin:top left; }
    .dropdown.open { transform:scale(1) translateY(0); opacity:1; pointer-events:all; }
    .drop-item { display:flex; align-items:center; gap:12px; padding:14px 20px; cursor:pointer; color:var(--text-primary); font-size:14px; font-weight:500; border-bottom:1px solid var(--glass-border); transition:background .18s; }
    .drop-item:last-child { border-bottom:none; }
    .drop-item:hover { background:var(--glass-strong); }
    .drop-icon { font-size:17px; width:22px; text-align:center; }

    .bottom-nav { position:fixed; bottom:0; left:0; right:0; z-index:200; height:var(--bottom-nav-h); background:var(--nav-bg); border-top:1px solid var(--glass-border); backdrop-filter:blur(32px) saturate(200%); -webkit-backdrop-filter:blur(32px) saturate(200%); transition:background .4s; }
    .bn-inner { display:flex; align-items:center; justify-content:space-around; height:100%; max-width:540px; margin:0 auto; padding:0 6px 8px; position:relative; }
    .nb { display:flex; flex-direction:column; align-items:center; gap:3px; padding:6px 10px; border-radius:16px; cursor:pointer; border:none; background:transparent; color:var(--text-secondary); font-family:inherit; transition:all .25s cubic-bezier(.34,1.56,.64,1); text-decoration:none; outline:none; position:relative; min-width:52px; }
    .nb:active { transform:scale(.82); }
    .nb.active { color:var(--accent); }
    .nb.active .nb-icon { background:rgba(34,211,238,.14); border-radius:12px; }
    .nb.active::after { content:''; position:absolute; bottom:1px; width:4px; height:4px; border-radius:50%; background:var(--accent); animation:dot-pop .3s cubic-bezier(.34,1.56,.64,1); }
    @keyframes dot-pop { from{transform:scale(0);opacity:0} to{transform:scale(1);opacity:1} }
    .nb-icon { width:32px; height:32px; display:flex; align-items:center; justify-content:center; font-size:18px; transition:all .25s; }
    .nb-label { font-size:10px; font-weight:600; letter-spacing:.02em; }
    .nb-add { width:52px; height:52px; border-radius:50%; background:#fff; border:none; cursor:pointer; display:flex; align-items:center; justify-content:center; box-shadow:0 4px 20px rgba(0,0,0,.35),0 0 0 3px var(--glass-border); margin-top:-14px; outline:none; transition:all .28s cubic-bezier(.34,1.56,.64,1); text-decoration:none; flex-shrink:0; }
    .nb-add:hover { transform:scale(1.12) rotate(8deg); box-shadow:0 8px 28px rgba(0,0,0,.40),0 0 0 3px rgba(34,211,238,.4); }
    .nb-add:active { transform:scale(.86); }
    .nb-add svg { width:22px; height:22px; }
    .nb-badge { position:absolute; top:2px; right:6px; width:16px; height:16px; border-radius:50%; background:linear-gradient(135deg,var(--accent),var(--accent2)); color:#020617; font-size:9px; font-weight:800; display:flex; align-items:center; justify-content:center; border:2px solid var(--navy); }

    .product-card { border-radius:20px; overflow:hidden; cursor:pointer; background:var(--card-bg); border:1px solid var(--glass-border); backdrop-filter:blur(20px); -webkit-backdrop-filter:blur(20px); box-shadow:0 6px 24px rgba(0,0,0,.18); transition:all .3s cubic-bezier(.34,1.56,.64,1); position:relative; }
    .product-card:hover { transform:translateY(-5px) scale(1.015); box-shadow:0 20px 50px rgba(0,0,0,.32),0 0 24px rgba(34,211,238,.10); border-color:rgba(34,211,238,.18); }
    .product-card:active { transform:scale(.96); }
    .pc-img { width:100%; aspect-ratio:1; object-fit:cover; filter:brightness(.9); transition:transform .5s; background:var(--navy-3); display:block; }
    .product-card:hover .pc-img { transform:scale(1.08); }
    .pc-img-wrap { overflow:hidden; position:relative; }
    .pc-fav { position:absolute; top:10px; width:30px; height:30px; border-radius:50%; border:none; cursor:pointer; background:rgba(2,6,23,.55); backdrop-filter:blur(8px); display:flex; align-items:center; justify-content:center; font-size:13px; transition:all .22s cubic-bezier(.34,1.56,.64,1); z-index:2; }
    [dir=ltr] .pc-fav { right:10px; }
    [dir=rtl] .pc-fav { left:10px; }
    .pc-fav:active { transform:scale(.75); }
    .pc-body { padding:12px 13px 14px; }
    .pc-name { font-size:13px; font-weight:700; letter-spacing:-.01em; margin-bottom:4px; line-height:1.3; }
    .pc-sub { font-size:11px; color:var(--text-secondary); margin-bottom:7px; }
    .pc-footer { display:flex; align-items:center; justify-content:space-between; }
    .pc-price { font-size:15px; font-weight:800; color:var(--accent); letter-spacing:-.02em; }
    .pc-eco { font-size:9px; font-weight:700; letter-spacing:.08em; text-transform:uppercase; color:var(--accent2); background:rgba(110,231,183,.12); border-radius:999px; padding:3px 8px; }

    #et-toast { position:fixed; bottom:calc(var(--bottom-nav-h) + 12px); left:50%; transform:translateX(-50%) translateY(14px); background:var(--card-bg); border:1px solid var(--glass-border); backdrop-filter:blur(20px); color:var(--text-primary); padding:11px 24px; border-radius:999px; font-size:13px; font-weight:600; z-index:9999; pointer-events:none; opacity:0; transition:all .32s cubic-bezier(.34,1.56,.64,1); white-space:nowrap; max-width:300px; text-align:center; font-family:inherit; }
    #et-toast.show { opacity:1; transform:translateX(-50%) translateY(0); }

    @keyframes et-ripple { from{transform:scale(0);opacity:.45} to{transform:scale(2.8);opacity:0} }
  `;
  document.head.appendChild(style);
}

// ─────────────────────────────────────────────────────────
//  USER DOC
// ─────────────────────────────────────────────────────────
async function upsertUserDoc(user, extras = {}) {
  const ref  = db.collection('users').doc(user.uid);
  const snap = await ref.get();
  const derivedName =
    extras.username ||
    user.displayName ||
    (user.email ? user.email.split('@')[0] : 'Guest');

  if (!snap.exists) {
    await ref.set({
      uid:         user.uid,
      email:       user.email       || '',
      username:    derivedName,
      displayName: user.displayName || derivedName,
      photoURL:    user.photoURL    || '',
      phone:       extras.phone     || '',
      provider:    user.providerData?.[0]?.providerId || 'password',
      online:      true,
      lastSeen:    firebase.firestore.FieldValue.serverTimestamp(),
      createdAt:   firebase.firestore.FieldValue.serverTimestamp(),
    });
  } else {
    const existing = snap.data();
    const updates  = {
      online:   true,
      lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
    };
    if (user.email    && !existing.email)    updates.email    = user.email;
    if (user.photoURL && !existing.photoURL) updates.photoURL = user.photoURL;
    if (user.displayName) updates.displayName = user.displayName;
    if (extras.phone)     updates.phone        = extras.phone;
    await ref.update(updates);
  }
}

async function saveGoogleUser(credential) {
  const user    = credential.user;
  const profile = credential.additionalUserInfo?.profile || {};
  const ref  = db.collection('users').doc(user.uid);
  const snap = await ref.get();
  const payload = {
    uid:         user.uid,
    email:       user.email                         || '',
    username:    snap.exists
                   ? (snap.data().username || user.displayName || '')
                   : (user.displayName || ''),
    displayName: user.displayName                   || '',
    photoURL:    user.photoURL                      || profile.picture || '',
    provider:    'google.com',
    online:      true,
    lastSeen:    firebase.firestore.FieldValue.serverTimestamp(),
  };
  if (!snap.exists) {
    payload.phone     = '';
    payload.createdAt = firebase.firestore.FieldValue.serverTimestamp();
    await ref.set(payload);
  } else {
    await ref.set(payload, { merge: true });
  }
}

// ─────────────────────────────────────────────────────────
//  PRESENCE
// ─────────────────────────────────────────────────────────
function setOnlineStatus(uid, online) {
  if (!uid) return Promise.resolve();
  return db.collection('users').doc(uid).update({ online, lastSeen:firebase.firestore.FieldValue.serverTimestamp() }).catch(()=>{});
}
function setupPresence(uid) {
  if (!uid) return;
  setOnlineStatus(uid, true);
  window.addEventListener('beforeunload', ()=>setOnlineStatus(uid, false));
  document.addEventListener('visibilitychange', ()=>setOnlineStatus(uid, document.visibilityState==='visible'));
}

// ─────────────────────────────────────────────────────────
//  CHAT UTILS
// ─────────────────────────────────────────────────────────
const getChatId = (a,b) => [a,b].sort().join('_');
function fmtTime(ts) {
  if (!ts) return '';
  const d = ts.toDate?ts.toDate():new Date(ts);
  return d.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});
}
function fmtDateLabel(ts) {
  if (!ts) return '';
  const d   = ts.toDate?ts.toDate():new Date(ts);
  const now  = new Date();
  const diff = Math.floor((new Date(now.getFullYear(),now.getMonth(),now.getDate())-new Date(d.getFullYear(),d.getMonth(),d.getDate()))/86400000);
  if (diff===0) return tr('today');
  if (diff===1) return tr('yesterday');
  return d.toLocaleDateString();
}

// ─────────────────────────────────────────────────────────
//  AUTH GUARDS
// ─────────────────────────────────────────────────────────
function requireAuth(cb) {
  auth.onAuthStateChanged(u=>{ if (!u){ window.location.href='login.html'; return; } cb(u); });
}
function redirectIfLoggedIn(dest='home.html') {
  auth.onAuthStateChanged(u=>{ if (u) window.location.href=dest; });
}

// ─────────────────────────────────────────────────────────
//  TOAST
// ─────────────────────────────────────────────────────────
let _tt;
function showToast(msg, ms=2600) {
  let el=document.getElementById('et-toast');
  if (!el) { el=document.createElement('div'); el.id='et-toast'; document.body.appendChild(el); }
  el.textContent=msg; el.classList.add('show');
  clearTimeout(_tt); _tt=setTimeout(()=>el.classList.remove('show'),ms);
}

// ─────────────────────────────────────────────────────────
//  RIPPLE
// ─────────────────────────────────────────────────────────
function addRipple(el) {
  el.style.position='relative'; el.style.overflow='hidden';
  el.addEventListener('click',e=>{
    const r=el.getBoundingClientRect(),s=Math.max(r.width,r.height);
    const sp=document.createElement('span');
    Object.assign(sp.style,{ position:'absolute',borderRadius:'50%',pointerEvents:'none',background:'rgba(34,211,238,.18)',width:s+'px',height:s+'px',left:(e.clientX-r.left-s/2)+'px',top:(e.clientY-r.top-s/2)+'px',animation:'et-ripple .55s ease-out forwards' });
    el.appendChild(sp); setTimeout(()=>sp.remove(),580);
  });
}

// ─────────────────────────────────────────────────────────
//  MISC
// ─────────────────────────────────────────────────────────
const escHtml = s => String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const avatarLetter = n => (n||'?').charAt(0).toUpperCase();

// ─────────────────────────────────────────────────────────
//  BUILD BOTTOM NAV
// ─────────────────────────────────────────────────────────
function buildBottomNav(activePage) {
  const nav = document.createElement('nav');
  nav.className = 'bottom-nav';
  nav.innerHTML = `
    <div class="bn-inner">
      <a href="home.html" class="nb ${activePage==='home'?'active':''}" data-nav="home">
        <div class="nb-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/><path d="M9 21V12h6v9"/></svg></div>
        <span class="nb-label" data-t="home">Home</span>
      </a>
      <a href="market.html" class="nb ${activePage==='market'?'active':''}" data-nav="market">
        <div class="nb-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg></div>
        <span class="nb-label" data-t="market">Market</span>
      </a>
      <a href="add.html" class="nb-add" title="Add listing">
        <svg viewBox="0 0 24 24" fill="none" stroke="#020617" stroke-width="2.8" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
      </a>
      <a href="chat.html" class="nb ${activePage==='chat'?'active':''}" data-nav="chat" id="chatNavBtn">
        <div class="nb-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg></div>
        <span class="nb-label" data-t="chat">Chat</span>
        <div class="nb-badge" id="chatBadge" style="display:none">0</div>
      </a>
      <a href="profile.html" class="nb ${activePage==='profile'?'active':''}" data-nav="profile">
        <div class="nb-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>
        <span class="nb-label" data-t="profile">Profile</span>
      </a>
    </div>`;
  document.body.appendChild(nav);
  applyTranslations();
}

// ─────────────────────────────────────────────────────────
//  BUILD PAGE HEADER
//  ✅ FIX 1: Logo name → OSYTRADE (was ECOTRADE)
//  ✅ FIX 2: Logout item → hidden by default, shown only when logged in
//  ✅ FIX 3: Login item  → shown only when NOT logged in
// ─────────────────────────────────────────────────────────
function buildPageHeader({ title='', showBack=false, showLogo=true, rightSlot='' }={}) {
  const h = document.createElement('header');
  h.className = 'page-header';
  h.innerHTML = `
    <div class="ph-inner">
      <div style="display:flex;align-items:center;gap:12px;flex:1;min-width:0">
        ${showBack ? `<a href="javascript:history.back()" class="icon-btn" title="Back"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="15 18 9 12 15 6"/></svg></a>` : ''}
        ${showLogo ? `<a href="home.html" class="logo-text" style="font-size:${title?'16px':'18px'}">OSYTRADE</a>` : ''}
        ${title ? `<span style="font-size:16px;font-weight:700;color:var(--text-primary)">${title}</span>` : ''}
      </div>
      <div class="ph-actions">
        ${rightSlot}
        <div class="icon-btn" onclick="window.location.href='cart.html'"><span class="drop-icon">🛒</span></div>
        <button class="icon-btn" onclick="toggleLang()" title="Language">🌐</button>
        <button class="icon-btn" data-theme-icon onclick="toggleTheme()">☀️</button>
        <button class="icon-btn" id="menuBtnGlobal"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="2.5" r="1.4" fill="currentColor"/><circle cx="8" cy="8" r="1.4" fill="currentColor"/><circle cx="8" cy="13.5" r="1.4" fill="currentColor"/></svg></button>
        <a href="profile.html" class="nav-avatar" id="navAv">?</a>
      </div>
    </div>`;
  document.body.prepend(h);

  // Dropdown — logout hidden by default, login shown by default
  const dd = document.createElement('div');
  dd.className = 'dropdown'; dd.id = 'globalDD';
  dd.style.right = '20px';
  dd.innerHTML = `
    <div class="drop-item" onclick="window.location.href='about.html'"><span class="drop-icon">ℹ️</span><span data-t="about">About</span></div>
    <div class="drop-item" onclick="window.location.href='Contact.html'"><span class="drop-icon">💬</span><span data-t="contact">Contact</span></div>
    <div class="drop-item" id="ddThemeItem"><span class="drop-icon" data-theme-icon>☀️</span><span data-t="theme_toggle">Light Mode</span></div>
    <div class="drop-item" id="ddLoginItem" onclick="window.location.href='login.html'" style="display:none"><span class="drop-icon">🔑</span><span data-t="login">Login</span></div>
    <div class="drop-item" id="ddLogout" style="display:none"><span class="drop-icon">🚪</span><span data-t="logout">Logout</span></div>`;
  document.body.appendChild(dd);

  let ddOpen = false;
  document.getElementById('menuBtnGlobal').addEventListener('click', e => {
    e.stopPropagation(); ddOpen=!ddOpen;
    const rect = e.currentTarget.getBoundingClientRect();
    dd.style.right = (window.innerWidth - rect.right) + 'px';
    dd.classList.toggle('open', ddOpen);
  });
  document.addEventListener('click', ()=>{ dd.classList.remove('open'); ddOpen=false; });
  dd.addEventListener('click', e=>e.stopPropagation());
  document.getElementById('ddThemeItem').addEventListener('click', ()=>{ toggleTheme(); dd.classList.remove('open'); });
  document.getElementById('ddLogout').addEventListener('click', async ()=>{
    const u = auth.currentUser;
    if (u) await setOnlineStatus(u.uid, false);
    await auth.signOut(); window.location.href='login.html';
  });

  // ✅ Auth state → show/hide logout & login items + update avatar
  auth.onAuthStateChanged(u => {
    const av         = document.getElementById('navAv');
    const logoutItem = document.getElementById('ddLogout');
    const loginItem  = document.getElementById('ddLoginItem');

    if (u) {
      // Logged in → show Logout, hide Login
      if (logoutItem) logoutItem.style.display = '';
      if (loginItem)  loginItem.style.display  = 'none';
      // Update avatar
      if (av) {
        av.textContent = avatarLetter(u.displayName || u.email || 'U');
        if (u.photoURL) av.innerHTML = `<img src="${u.photoURL}" alt=""/>`;
      }
    } else {
      // Not logged in → hide Logout, show Login
      if (logoutItem) logoutItem.style.display = 'none';
      if (loginItem)  loginItem.style.display  = '';
      if (av) av.textContent = '?';
    }
  });

  applyTranslations();
}

// ─────────────────────────────────────────────────────────
//  INTERSECTION OBSERVER (fade-up)
// ─────────────────────────────────────────────────────────
function observeFadeUps() {
  const obs = new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); } });
  },{threshold:.08});
  document.querySelectorAll('.fade-up').forEach(el=>obs.observe(el));
}

// ─────────────────────────────────────────────────────────
//  DOMContentLoaded INIT
// ─────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', ()=>{
  injectSharedCSS();
  initTheme(); initLang(); applyTranslations();
});