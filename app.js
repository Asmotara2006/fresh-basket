const SUPABASE_URL = "https://ebrimmhnethptyyjkcsf.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_bwI8KDWr7QI0bVSQhbuhjg_jUpVg7_j";
const demoProducts=[
{id:1,name:"Tomato",as:"বিলাহী",category:"Vegetables",catAs:"শাক-পাচলি",price:30,unit:"/ kg",emoji:"🍅"},
{id:2,name:"Potato",as:"আলু",category:"Vegetables",catAs:"শাক-পাচলি",price:25,unit:"/ kg",emoji:"🥔"},
{id:3,name:"Onion",as:"পিঁয়াজ",category:"Vegetables",catAs:"শাক-পাচলি",price:35,unit:"/ kg",emoji:"🧅"},
{id:4,name:"Spinach",as:"পালেং শাক",category:"Greens",catAs:"শাক",price:20,unit:"/ bunch",emoji:"🥬"},
{id:5,name:"Banana",as:"কল",category:"Fruits",catAs:"ফল-মূল",price:50,unit:"/ dozen",emoji:"🍌"},
{id:6,name:"Apple",as:"আপেল",category:"Fruits",catAs:"ফল-মূল",price:140,unit:"/ kg",emoji:"🍎"},
{id:7,name:"Rice",as:"চাউল",category:"Groceries",catAs:"মুদী সামগ্ৰী",price:55,unit:"/ kg",emoji:"🍚"},
{id:8,name:"Lentils",as:"দাইল",category:"Groceries",catAs:"মুদী সামগ্ৰী",price:95,unit:"/ kg",emoji:"🫘"}];
const copy={en:{tag:"Freshness at your doorstep",eyebrow:"LOCAL • FRESH • TRUSTED",title:"Fresh picks for<br><em>happy homes.</em>",hero:"Shop fresh vegetables, fruits and daily essentials in Dhubri.",shop:"Shop now",benefits:["Fresh choices","Serving Dhubri","Cash on delivery"],browse:"GOOD FOOD, EVERY DAY",products:"Shop our products",categories:["All","Vegetables","Fruits","Greens","Groceries"],deliveryEyebrow:"FROM OUR MARKET TO YOUR HOME",deliveryTitle:"A fresher day starts here.",deliveryText:"Order your daily essentials with convenient Cash on Delivery.",footer:"Fresh groceries for Dhubri, Assam.",cart:"Cart",yourCart:"Your cart",total:"Total",checkout:"Delivery details",name:"Your name",phone:"Phone number",address:"Delivery address",place:"Place COD order",notice:"Demo preview: orders are not yet sent to a store owner.",empty:"Your cart is empty.",added:"Added to cart",items:"items"},as:{tag:"আপোনাৰ দুৱাৰমুখত সতেজতা",eyebrow:"স্থানীয় • সতেজ • বিশ্বাসযোগ্য",title:"সতেজ সামগ্ৰী,<br><em>সুখী পৰিয়াল।</em>",hero:"ধুবুৰীত সতেজ শাক-পাচলি, ফল-মূল আৰু দৈনন্দিন সামগ্ৰী কিনক।",shop:"কিনিবলৈ যাওক",benefits:["সতেজ সামগ্ৰী","ধুবুৰীত সেৱা","ঘৰত সামগ্ৰী পোৱাৰ পিছত মূল্য দিয়ক"],browse:"প্ৰতিদিনে ভাল খাদ্য",products:"আমাৰ সামগ্ৰী কিনক",categories:["সকলো","শাক-পাচলি","ফল-মূল","শাক","মুদী সামগ্ৰী"],deliveryEyebrow:"আমাৰ বজাৰৰ পৰা আপোনাৰ ঘৰলৈ",deliveryTitle:"সতেজ দিনৰ আৰম্ভণি ইয়াৰ পৰাই।",deliveryText:"Cash on Delivery-ৰ সুবিধাৰে দৈনন্দিন সামগ্ৰী অৰ্ডাৰ কৰক।",footer:"ধুবুৰী, অসমৰ বাবে সতেজ গেলামাল।",cart:"কাৰ্ট",yourCart:"আপোনাৰ কাৰ্ট",total:"মুঠ",checkout:"ডেলিভাৰীৰ তথ্য",name:"আপোনাৰ নাম",phone:"ফোন নম্বৰ",address:"ডেলিভাৰীৰ ঠিকনা",place:"Cash on Delivery অৰ্ডাৰ দিয়ক",notice:"ডেমো: অৰ্ডাৰ এতিয়াও দোকানৰ মালিকলৈ পঠিওৱা নহয়।",empty:"আপোনাৰ কাৰ্ট খালী।",added:"কাৰ্টত যোগ হ'ল",items:"বিধ"}};
let products=[...demoProducts];
let lang="en",active="All",cart={};
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
const $=id=>document.getElementById(id),t=()=>copy[lang],fmt=n=>"₹"+n;
function renderText(){const c=t();$("tagline").textContent=c.tag;$("heroEyebrow").textContent=c.eyebrow;$("heroTitle").innerHTML=c.title;$("heroText").textContent=c.hero;$("shopNow").innerHTML=c.shop+" <span>→</span>";$("benefit1").textContent=c.benefits[0];$("benefit2").textContent=c.benefits[1];$("benefit3").textContent=c.benefits[2];$("browse").textContent=c.browse;$("productTitle").textContent=c.products;$("deliveryEyebrow").textContent=c.deliveryEyebrow;$("deliveryTitle").textContent=c.deliveryTitle;$("deliveryText").textContent=c.deliveryText;$("footerText").textContent=c.footer;$("langBtn").textContent=lang==="en"?"অসমীয়া":"English";$("cartLabel").textContent=c.cart;$("cartTitle").textContent=c.yourCart;$("totalLabel").textContent=c.total;$("checkoutTitle").textContent=c.checkout;$("nameLabel").textContent=c.name;$("phoneLabel").textContent=c.phone;$("addressLabel").textContent=c.address;$("placeOrder").textContent=c.place;$("demoNotice").textContent=c.notice;renderFilters();renderProducts();renderCart()}
function renderFilters(){const cats=t().categories;const keys=["All","Vegetables","Fruits","Greens","Groceries"];$("filters").innerHTML=keys.map((k,i)=>'<button class="filter '+(active===k?'active':'')+'" data-cat="'+k+'">'+cats[i]+'</button>').join("");document.querySelectorAll(".filter").forEach(b=>b.onclick=()=>{active=b.dataset.cat;renderFilters();renderProducts()})}
function renderProducts(){const list=products.filter(p=>active==="All"||p.category===active);$("productCount").textContent=list.length+" "+t().items;$("productGrid").innerHTML=list.map(p=>'<article class="product-card"><div class="product-art">'+p.emoji+'</div><div class="product-info"><h3>'+(lang==="en"?p.name:p.as)+'</h3><span class="unit">'+(lang==="en"?p.unit:p.unit.replace("kg","কেজি").replace("bunch","আটি").replace("dozen","ডজন"))+'</span><div class="product-bottom"><span class="price">'+fmt(p.price)+'</span><button class="add" data-add="'+p.id+'">+ '+(lang==="en"?"Add":"যোগ")+'</button></div></div></article>').join("");document.querySelectorAll("[data-add]").forEach(b=>b.onclick=()=>{const id=+b.dataset.add;cart[id]=(cart[id]||0)+1;renderCart();$("cartCount").textContent=cartCount();})}
function cartCount(){return Object.values(cart).reduce((a,b)=>a+b,0)}
function renderCart(){const entries=products.filter(p=>cart[p.id]);$("cartCount").textContent=cartCount();$("cartItems").innerHTML=entries.length?entries.map(p=>'<div class="cart-row"><span class="cart-emoji">'+p.emoji+'</span><div class="cart-row-info"><strong>'+(lang==="en"?p.name:p.as)+'</strong><small>'+fmt(p.price)+' × '+cart[p.id]+'</small></div><div class="qty"><button data-minus="'+p.id+'">−</button><b>'+cart[p.id]+'</b><button data-plus="'+p.id+'">+</button></div></div>').join(""):'<p class="empty">'+t().empty+'</p>';const total=entries.reduce((s,p)=>s+p.price*cart[p.id],0);$("cartTotal").textContent=fmt(total);document.querySelectorAll("[data-minus]").forEach(b=>b.onclick=()=>{const id=+b.dataset.minus;cart[id]--;if(cart[id]<=0)delete cart[id];renderCart()});document.querySelectorAll("[data-plus]").forEach(b=>b.onclick=()=>{const id=+b.dataset.plus;cart[id]++;renderCart()})}
$("langBtn").onclick=()=>{lang=lang==="en"?"as":"en";renderText()};
$("cartBtn").onclick=()=>{$("overlay").hidden=false;renderCart()};
$("closeCart").onclick=()=>{$("overlay").hidden=true};
$("overlay").addEventListener("click",e=>{if(e.target===$("overlay"))$("overlay").hidden=true});
$("orderForm").addEventListener("submit",e=>{e.preventDefault();if(!cartCount()){alert(t().empty);return}const order=products.filter(p=>cart[p.id]).map(p=>(lang==="en"?p.name:p.as)+" × "+cart[p.id]+" = "+fmt(p.price*cart[p.id])).join("\n");const total=products.reduce((s,p)=>s+p.price*(cart[p.id]||0),0);alert((lang==="en"?"Order preview":"অৰ্ডাৰৰ পূৰ্বদৰ্শন")+"\n\n"+order+"\n\n"+t().total+": "+fmt(total)+"\n\n"+t().notice);});
async function loadProductsFromSupabase(){
  const {data,error}=await supabaseClient
    .from("products")
    .select("id,name_en,name_as,price,image_url,category,stock")
    .order("id");
  if(error){
    console.error("Fresh Basket product loading failed:",error.message);
    $("productCount").textContent="Products could not be loaded";
    return;
  }
  const emojiFor={Vegetables:"🥕",Fruits:"🍎",Greens:"🥬",Groceries:"🛒"};
  const assameseCategory={Vegetables:"শাক-পাচলি",Fruits:"ফল-মূল",Greens:"শাক",Groceries:"মুদী সামগ্ৰী"};
  products=(data||[]).map(p=>({
    id:Number(p.id),
    name:p.name_en,
    as:p.name_as||p.name_en,
    category:p.category||"Groceries",
    catAs:assameseCategory[p.category]||"মুদী সামগ্ৰী",
    price:Number(p.price),
    unit:"/ kg",
    emoji:emojiFor[p.category]||"🛒",
    image_url:p.image_url,
    stock:Number(p.stock||0)
  }));
  renderProducts();
  renderCart();
}
$("year").textContent=new Date().getFullYear();renderText();loadProductsFromSupabase();


// Admin sign-in and product management. Access is checked against the private admin_users table.
const adminOverlay = $("adminOverlay");
const adminLoginArea = $("adminLoginArea");
const adminManageArea = $("adminManageArea");
let approvedAdmin = false;
function adminMessage(message, isError=false){
  ["adminMessage","adminLoginMessage"].forEach(id=>{
    const el=$(id);
    if(el){el.textContent=message;el.style.color=isError?"#a32b2b":"#16834a";}
  });
}
function clearAdminProductForm(){
  $("productAdminForm").reset();
  $("adminProductId").value="";
  $("productFormHeading").textContent="Add product";
}
function safeText(value){
  return String(value??"").replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
}
async function checkAdminAccess(){
  const {data:{user}} = await supabaseClient.auth.getUser();
  if(!user){approvedAdmin=false;return false;}
  const {data,error}=await supabaseClient.from("admin_users").select("user_id").eq("user_id",user.id).maybeSingle();
  if(error){adminMessage("Could not verify admin access: "+error.message,true);approvedAdmin=false;return false;}
  approvedAdmin=!!data;
  if(!approvedAdmin) adminMessage("This account is not approved as an administrator.",true);
  else $("adminSignedIn").textContent=user.email||"Admin";
  return approvedAdmin;
}
async function showAdminState(){
  const {data:{session}}=await supabaseClient.auth.getSession();
  if(!session){
    adminLoginArea.hidden=false;
    adminManageArea.hidden=true;
    return;
  }
  const ok=await checkAdminAccess();
  if(ok){
    adminLoginArea.hidden=true;
    adminManageArea.hidden=false;
    await loadAdminProducts();
  }else{
    await supabaseClient.auth.signOut();
    adminLoginArea.hidden=false;
    adminManageArea.hidden=true;
    adminMessage("This account is not approved as an administrator. Please check the admin account.",true);
  }
}
async function loadAdminProducts(){
  if(!approvedAdmin)return;
  const {data,error}=await supabaseClient.from("products").select("id,name_en,name_as,price,stock,category,image_url").order("id");
  if(error){adminMessage("Could not load products: "+error.message,true);return;}
  const list=$("adminProductList");
  list.innerHTML="";
  (data||[]).forEach(p=>{
    const row=document.createElement("div");
    row.className="admin-product-row";
    row.innerHTML='<div><strong>'+safeText(p.name_en)+'</strong><small>'+safeText(p.category)+' · ₹'+safeText(p.price)+' · Stock: '+safeText(p.stock)+'</small></div><div class="admin-row-actions"><button type="button" data-edit="'+p.id+'">Edit</button><button type="button" class="delete-product" data-delete="'+p.id+'">Delete</button></div>';
    list.appendChild(row);
  });
  list.querySelectorAll("[data-edit]").forEach(btn=>btn.addEventListener("click",()=>{
    const p=data.find(item=>String(item.id)===btn.dataset.edit);
    if(!p)return;
    $("adminProductId").value=p.id;
    $("adminNameEn").value=p.name_en||"";
    $("adminNameAs").value=p.name_as||"";
    $("adminPrice").value=p.price;
    $("adminStock").value=p.stock??0;
    $("adminCategory").value=p.category||"Groceries";
    $("adminImage").value=p.image_url||"";
    $("productFormHeading").textContent="Edit product";
    $("productAdminForm").scrollIntoView({behavior:"smooth",block:"start"});
  }));
  list.querySelectorAll("[data-delete]").forEach(btn=>btn.addEventListener("click",async()=>{
    if(!approvedAdmin||!confirm("Delete this product?"))return;
    const {error}=await supabaseClient.from("products").delete().eq("id",btn.dataset.delete);
    if(error){adminMessage("Delete failed: "+error.message,true);return;}
    adminMessage("Product deleted.");
    await loadProductsFromSupabase();
    await loadAdminProducts();
  }));
}
$("adminBtn").addEventListener("click",async()=>{
  adminOverlay.hidden=false;
  adminMessage("");
  await showAdminState();
});
$("adminClose").addEventListener("click",()=>{adminOverlay.hidden=true;});
adminOverlay.addEventListener("click",e=>{if(e.target===adminOverlay)adminOverlay.hidden=true;});
$("adminLoginForm").addEventListener("submit",async e=>{
  e.preventDefault();
  const email=$("adminEmail").value.trim();
  const password=$("adminPassword").value;
  const {error}=await supabaseClient.auth.signInWithPassword({email,password});
  $("adminPassword").value="";
  if(error){adminMessage("Login failed. Check your email and password.",true);return;}
  await showAdminState();
});
$("adminLogout").addEventListener("click",async()=>{
  await supabaseClient.auth.signOut();
  approvedAdmin=false;
  adminManageArea.hidden=true;
  adminLoginArea.hidden=false;
  clearAdminProductForm();
  adminMessage("Logged out.");
});
$("adminCancelEdit").addEventListener("click",clearAdminProductForm);
$("productAdminForm").addEventListener("submit",async e=>{
  e.preventDefault();
  if(!approvedAdmin){adminMessage("Admin access required.",true);return;}
  const payload={
    name_en:$("adminNameEn").value.trim(),
    name_as:$("adminNameAs").value.trim()||null,
    price:Number($("adminPrice").value),
    stock:Number($("adminStock").value),
    category:$("adminCategory").value,
    image_url:$("adminImage").value.trim()||null
  };
  const id=$("adminProductId").value;
  const result=id
    ? await supabaseClient.from("products").update(payload).eq("id",id)
    : await supabaseClient.from("products").insert(payload);
  if(result.error){adminMessage("Save failed: "+result.error.message,true);return;}
  adminMessage(id?"Product updated.":"Product added.");
  clearAdminProductForm();
  await loadProductsFromSupabase();
  await loadAdminProducts();
});
