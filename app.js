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
function renderProducts(){
  const list=products.filter(p=>active==="All"||p.category===active);
  $("productCount").textContent=list.length+" "+t().items;
  $("productGrid").innerHTML=list.map(p=>{
    const outOfStock=Number(p.stock??0)<=0;
    const label=outOfStock?(lang==="en"?"Out of Stock":"ষ্টক শেষ"):(lang==="en"?"Add":"যোগ");
    return '<article class="product-card"><div class="product-art">'+(p.image_url?'<img src="'+safeText(p.image_url)+'" alt="'+safeText(p.name)+'">':p.emoji)+'</div><div class="product-info"><h3>'+(lang==="en"?p.name:p.as)+'</h3><span class="unit">'+(lang==="en"?p.unit:p.unit.replace("kg","কেজি").replace("bunch","আটি").replace("dozen","ডজন"))+'</span><div class="product-bottom"><span class="price">'+fmt(p.price)+'</span><button class="add" data-add="'+p.id+'" '+(outOfStock?'disabled aria-disabled="true"':'')+'>'+ (outOfStock?'':'+ ')+label+'</button></div></div></article>';
  }).join("");
  document.querySelectorAll("[data-add]").forEach(b=>b.onclick=()=>{
    const id=+b.dataset.add;
    const product=products.find(p=>p.id===id);
    if(!product||cart[id]>=Number(product.stock??0))return;
    cart[id]=(cart[id]||0)+1;
    renderCart();
    $("cartCount").textContent=cartCount();
  });
}
function cartCount(){return Object.values(cart).reduce((a,b)=>a+b,0)}
function renderCart(){const entries=products.filter(p=>cart[p.id]);$("cartCount").textContent=cartCount();$("cartItems").innerHTML=entries.length?entries.map(p=>'<div class="cart-row"><span class="cart-emoji">'+p.emoji+'</span><div class="cart-row-info"><strong>'+(lang==="en"?p.name:p.as)+'</strong><small>'+fmt(p.price)+' × '+cart[p.id]+'</small></div><div class="qty"><button data-minus="'+p.id+'">−</button><b>'+cart[p.id]+'</b><button data-plus="'+p.id+'">+</button></div></div>').join(""):'<p class="empty">'+t().empty+'</p>';const total=entries.reduce((s,p)=>s+p.price*cart[p.id],0);$("cartTotal").textContent=fmt(total);document.querySelectorAll("[data-minus]").forEach(b=>b.onclick=()=>{const id=+b.dataset.minus;cart[id]--;if(cart[id]<=0)delete cart[id];renderCart()});document.querySelectorAll("[data-plus]").forEach(b=>b.onclick=()=>{const id=+b.dataset.plus;const product=products.find(p=>p.id===id);if(!product||cart[id]>=Number(product.stock??0))return;cart[id]++;renderCart()})}
$("langBtn").onclick=()=>{lang=lang==="en"?"as":"en";renderText()};

$("cartBtn").onclick = async () => {
  $("overlay").hidden = false;
  renderCart();

  const { data: { user } } = await supabaseClient.auth.getUser();

  if (user) {
    $("customerName").value = user.user_metadata?.full_name || "";
    $("customerPhone").value = user.user_metadata?.mobile || "";
    $("customerAddress").value = user.user_metadata?.delivery_address || "";
  }
};
$("closeCart").onclick=()=>{$("overlay").hidden=true};
$("overlay").addEventListener("click",e=>{if(e.target===$("overlay"))$("overlay").hidden=true});
$("orderForm").addEventListener("submit",async e=>{
  e.preventDefault();
  if(!cartCount()){alert(t().empty);return;}
  const customerName=$("customerName").value.trim();
  const customerPhone=$("customerPhone").value.trim();
  const deliveryAddress=$("customerAddress").value.trim();
  if(!customerName||!customerPhone||!deliveryAddress){alert(lang==="en"?"Please complete all delivery details.":"অনুগ্ৰহ কৰি ডেলিভাৰীৰ সকলো তথ্য পূৰণ কৰক।");return;}
  const selected=products.filter(p=>cart[p.id]);
  const items=selected.map(p=>({
    product_id:p.id,
    name_en:p.name,
    name_as:p.as,
    quantity:cart[p.id],
    unit_price:p.price,
    line_total:p.price*cart[p.id]
  }));
  const total=items.reduce((sum,item)=>sum+item.line_total,0);
  const submitButton=$("placeOrder");
  submitButton.disabled=true;
  submitButton.textContent=lang==="en"?"Placing order...":"অৰ্ডাৰ দিয়া হৈছে...";
  const {data:{session:customerSession}} = await supabaseClient.auth.getSession();
  const {error}=await supabaseClient.from("customer_orders").insert({
    user_id:customerSession?.user?.id || null,
    customer_name:customerName,
    customer_phone:customerPhone,
    delivery_address:deliveryAddress,
    items,
    total,
    status:"pending"
  });
  submitButton.disabled=false;
  submitButton.textContent=t().place;
  if(error){
    console.error("Order submission failed:",error.message);
    alert((lang==="en"?"Order could not be placed: ":"অৰ্ডাৰ দিব পৰা নগ'ল: ")+error.message);
    return;
  }
  alert(lang==="en"?"Order placed successfully! The store can now see your order in Admin.":"অৰ্ডাৰ সফলতাৰে দিয়া হ'ল! দোকানৰ Admin-ত অৰ্ডাৰটো দেখা যাব।");
  cart={};
  $("orderForm").reset();
  renderCart();
  $("overlay").hidden=true;
  await loadProductsFromSupabase();
});
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
let adminAccessError = "";
function adminMessage(message, isError=false){
  ["adminMessage","adminLoginMessage"].forEach(id=>{
    const el=$(id);
    if(el){el.textContent=message;el.style.color=isError?"#a32b2b":"#16834a";}
  });
}
function clearAdminProductForm(){
  $("productAdminForm").reset();
  $("adminProductId").value="";
  $("adminPhotoFile").value="";
  $("productFormHeading").textContent="Add product";
}
function safeText(value){
  return String(value??"").replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
}
async function checkAdminAccess(){
  adminAccessError = "";
  const {data:{user},error:userError} = await supabaseClient.auth.getUser();
  if(userError){adminAccessError="Could not read signed-in user: "+userError.message;approvedAdmin=false;return false;}
  if(!user){adminAccessError="No signed-in user found. Please log in again.";approvedAdmin=false;return false;}
  const {data,error}=await supabaseClient.from("admin_users").select("user_id").eq("user_id",user.id).maybeSingle();
  if(error){adminAccessError="Admin lookup failed: "+error.message+" (signed in as "+(user.email||"unknown")+", ID "+user.id+")";approvedAdmin=false;return false;}
  approvedAdmin=!!data;
  if(!approvedAdmin) adminAccessError="No matching admin row for signed-in account "+(user.email||"unknown")+" (ID "+user.id+").";
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
    await loadAdminOrders();
    await loadAdminSalesReport();
  }else{
    await supabaseClient.auth.signOut();
    adminLoginArea.hidden=false;
    adminManageArea.hidden=true;
    adminMessage(adminAccessError || "Admin access could not be verified. Please try again.",true);
  }
}
async function loadAdminOrders(){
  if(!approvedAdmin)return;
  const list=$("adminOrderList");
  list.textContent="Loading orders...";
  const {data,error}=await supabaseClient
    .from("customer_orders")
    .select("id,customer_name,customer_phone,delivery_address,items,total,status,created_at")
    .order("created_at",{ascending:false});
  if(error){list.textContent="Could not load orders: "+error.message;return;}
  list.innerHTML="";
  if(!data||!data.length){list.textContent="No customer orders yet.";return;}
  data.forEach(order=>{
    const card=document.createElement("article");
    card.className="admin-product-row";
    const details=document.createElement("div");
    const heading=document.createElement("strong");
    heading.textContent="Order #"+order.id+" · "+(order.customer_name||"Customer");
    const phone=document.createElement("small");
    phone.textContent="Phone: "+(order.customer_phone||"");
    const address=document.createElement("small");
    address.textContent="Address: "+(order.delivery_address||"");
    const itemText=document.createElement("small");
    itemText.textContent="Items: "+(Array.isArray(order.items)?order.items.map(item=>(item.name_en||item.name_as||"Product")+" × "+item.quantity).join(", "):"");
    const total=document.createElement("small");
    total.textContent="Total: ₹"+order.total+" · "+new Date(order.created_at).toLocaleString();
    const statusLabel=document.createElement("label");
    statusLabel.textContent="Order status: ";
    const statusSelect=document.createElement("select");
    statusSelect.setAttribute("aria-label","Status for order #"+order.id);
    const allowedStatuses=[
      ["pending","Pending"],
      ["confirmed","Confirmed"],
      ["preparing","Preparing"],
      ["delivered","Delivered"],
      ["cancelled","Cancelled"]
    ];
    allowedStatuses.forEach(([value,label])=>{
      const option=document.createElement("option");
      option.value=value;
      option.textContent=label;
      statusSelect.appendChild(option);
    });
    const currentStatus=allowedStatuses.some(([value])=>value===order.status)?order.status:"pending";
    statusSelect.value=currentStatus;
    statusSelect.addEventListener("change",async()=>{
      if(!approvedAdmin){statusSelect.value=currentStatus;return;}
      statusSelect.disabled=true;
      const {error:updateError}=await supabaseClient
        .from("customer_orders")
        .update({status:statusSelect.value})
        .eq("id",order.id);
      if(updateError){
        alert("Could not update order status: "+updateError.message);
        statusSelect.value=currentStatus;
      }else{
        order.status=statusSelect.value;
      }
      statusSelect.disabled=false;
    });
    statusLabel.appendChild(statusSelect);
        const whatsappBtn = document.createElement("button");
    whatsappBtn.type = "button";
    whatsappBtn.textContent = "WhatsApp";
    whatsappBtn.addEventListener("click", () => {
      const items = Array.isArray(order.items)
        ? order.items.map(item =>
            (item.name_en || item.name_as || "Product") +
            " × " + item.quantity
          ).join(", ")
        : "Not available";

      const message =
        "Fresh Basket - New Order #" + order.id +
        "\nCustomer: " + (order.customer_name || "") +
        "\nPhone: " + (order.customer_phone || "") +
        "\nAddress: " + (order.delivery_address || "") +
        "\nItems: " + items +
        "\nTotal: ₹" + order.total +
        "\nStatus: " + order.status;

      window.open(
  "https://wa.me/918134980118?text=" + encodeURIComponent(message),
  "_blank"
);
    });
    details.appendChild(whatsappBtn);
    details.append(heading,phone,address,itemText,total,statusLabel);
    card.appendChild(details);
    list.appendChild(card);
  });
}
async function loadAdminSalesReport(){
  const report = $("adminSalesReport");
  if(!approvedAdmin || !report) return;

  report.textContent = "Loading sales report...";

  const {data,error} = await supabaseClient
    .from("customer_orders")
    .select("total,status,created_at");

  if(error){
    report.textContent = "Could not load sales report: " + error.message;
    return;
  }

  const orders = data || [];
  const valid = orders.filter(o => o.status !== "cancelled");
  const delivered = orders.filter(o => o.status === "delivered");

  const now = new Date();
  const today = now.toLocaleDateString("en-CA");

  const orderValue = valid.reduce(
    (sum,o) => sum + Number(o.total || 0), 0
  );

  const deliveredSales = delivered.reduce(
    (sum,o) => sum + Number(o.total || 0), 0
  );

  const todaySales = delivered
    .filter(o => new Date(o.created_at).toLocaleDateString("en-CA") === today)
    .reduce((sum,o) => sum + Number(o.total || 0), 0);

  const monthlySales = delivered
    .filter(o => {
      const d = new Date(o.created_at);
      return d.getFullYear() === now.getFullYear() &&
        d.getMonth() === now.getMonth();
    })
    .reduce((sum,o) => sum + Number(o.total || 0), 0);

  const pending = orders.filter(
    o => o.status === "pending"
  ).length;

  report.innerHTML = `
    <div class="admin-product-row"><strong>Total Orders: ${orders.length}</strong></div>
    <div class="admin-product-row"><strong>Pending Orders: ${pending}</strong></div>
    <div class="admin-product-row"><strong>Total Order Value: ₹${orderValue.toFixed(2)}</strong></div>
    <div class="admin-product-row"><strong>Delivered Sales: ₹${deliveredSales.toFixed(2)}</strong></div>
    <div class="admin-product-row"><strong>Today's Delivered Sales: ₹${todaySales.toFixed(2)}</strong></div>
    <div class="admin-product-row"><strong>This Month's Delivered Sales: ₹${monthlySales.toFixed(2)}</strong></div>
  `;
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
    $("adminPhotoFile").value="";
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
  if(error){adminMessage("Login error: "+error.message,true);return;}
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
  const photoFile=$("adminPhotoFile").files[0];
  if(photoFile){
    if(!photoFile.type.startsWith("image/")){adminMessage("Please choose an image file.",true);return;}
    if(photoFile.size>5*1024*1024){adminMessage("Photo must be 5 MB or smaller.",true);return;}
    adminMessage("Uploading product photo...");
    const extension=(photoFile.name.split(".").pop()||"jpg").toLowerCase().replace(/[^a-z0-9]/g,"")||"jpg";
    const filePath=Date.now()+"-"+Math.random().toString(36).slice(2)+"."+extension;
    const {error:uploadError}=await supabaseClient.storage.from("product-images").upload(filePath,photoFile,{contentType:photoFile.type,upsert:false});
    if(uploadError){adminMessage("Photo upload failed: "+uploadError.message,true);return;}
    const {data:publicUrlData}=supabaseClient.storage.from("product-images").getPublicUrl(filePath);
    payload.image_url=publicUrlData.publicUrl;
  }
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

let customerAuthMode = "signup";

async function updateCustomerAuthButton(session) {
  const btn = $("customerAuthBtn");
  if (btn) {
    btn.textContent = session ? "Sign Out" : "Sign In / Sign Up";
  }

  const profileBtn = $("myProfileBtn");
  if (profileBtn) profileBtn.hidden = !session;

  const adminBtn = $("adminBtn");
  if (!adminBtn) return;

  if (!session) {
    adminBtn.hidden = false;
    return;
  }

  const { data, error } = await supabaseClient
    .from("admin_users")
    .select("user_id")
    .eq("user_id", session.user.id)
    .maybeSingle();

  // Keep Admin visible only for an approved admin account.
  adminBtn.hidden = !!error || !data;
}

$("customerAuthBtn").addEventListener("click", async () => {
  const { data } = await supabaseClient.auth.getSession();

  if (data.session) {
    const { error } = await supabaseClient.auth.signOut();
    if (error) {
      alert(error.message);
      return;
    }
    updateCustomerAuthButton(null);
    alert("You have signed out.");
  } else {
    $("customerAuthOverlay").hidden = false;
  }
});

$("customerAuthClose").addEventListener("click", () => {
  $("customerAuthOverlay").hidden = true;
});

$("customerAuthSwitch").addEventListener("click", () => {
  customerAuthMode =
    customerAuthMode === "signup" ? "signin" : "signup";

  $("customerAuthTitle").textContent =
    customerAuthMode === "signup" ? "Sign Up" : "Sign In";

  $("customerAuthSubmit").textContent =
    customerAuthMode === "signup" ? "Sign Up" : "Sign In";

  $("customerAuthSwitch").textContent =
    customerAuthMode === "signup"
      ? "Already have an account? Sign In"
      : "New customer? Sign Up";

  $("customerAuthName").parentElement.hidden =
    customerAuthMode === "signin";

  $("customerAuthMessage").textContent = "";
});

$("customerAuthSubmit").addEventListener("click", async () => {
  const name = $("customerAuthName").value.trim();
  const email = $("customerAuthEmail").value.trim();
  const password = $("customerAuthPassword").value;
  const message = $("customerAuthMessage");

  if (!email || !password || (customerAuthMode === "signup" && !name)) {
    message.textContent = "Please fill in all required fields.";
    return;
  }

  message.textContent = "Please wait...";

  let result;

  if (customerAuthMode === "signup") {
    result = await supabaseClient.auth.signUp({
      email,
      password,
      options: {
  data: { full_name: name },
  emailRedirectTo: "https://asmotara2006.github.io/fresh-basket/"
}
    });
  } else {
    result = await supabaseClient.auth.signInWithPassword({
      email,
      password
    });
  }

  if (result.error) {
    message.textContent = result.error.message;
    return;
  }

  if (customerAuthMode === "signup" && !result.data.session) {
    message.textContent = "Account created. Please check your email to confirm your account.";
    return;
  }

  message.textContent = "Login successful!";
  $("customerAuthOverlay").hidden = true;
  updateCustomerAuthButton(result.data.session);
});

supabaseClient.auth.getSession().then(({ data }) => {
  updateCustomerAuthButton(data.session);
});

supabaseClient.auth.onAuthStateChange((_event, session) => {
  updateCustomerAuthButton(session);
});

async function loadMyOrders() {
  const list = $("myOrdersList");
  list.textContent = "Loading your orders...";
  const { data: { user }, error: userError } = await supabaseClient.auth.getUser();

  if (userError || !user) {
    list.textContent = "Please sign in to view your orders.";
    return;
  }

  const { data, error } = await supabaseClient
    .from("customer_orders")
    .select("id,items,total,status,created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    list.textContent = "Could not load orders: " + error.message;
    return;
  }

  list.innerHTML = "";
  if (!data || data.length === 0) {
    list.textContent = "You have no orders yet.";
    return;
  }

  data.forEach(order => {
    const card = document.createElement("article");
    card.className = "admin-product-row";

    const heading = document.createElement("strong");
    heading.textContent = "Order #" + order.id;

    const itemLine = document.createElement("p");
    itemLine.textContent = Array.isArray(order.items)
      ? order.items.map(item => (item.name_en || item.name_as || "Product") + " × " + item.quantity).join(", ")
      : "Items not available";

    const total = document.createElement("p");
    total.textContent = "Total: ₹" + Number(order.total || 0).toFixed(2);

    const status = document.createElement("p");
    const statusNames = {
      pending: "Pending",
      confirmed: "Confirmed",
      preparing: "Preparing",
      delivered: "Delivered",
      cancelled: "Cancelled"
    };
    status.textContent = "Status: " + (statusNames[order.status] || order.status || "Pending");

    const date = document.createElement("small");
    date.textContent = order.created_at ? new Date(order.created_at).toLocaleString() : "";

    card.append(heading, itemLine, total, status, date);
    list.appendChild(card);
  });
}

$("myOrdersBtn").addEventListener("click", async () => {
  $("myOrdersOverlay").hidden = false;
  const { data: { session } } = await supabaseClient.auth.getSession();
  if (!session) {
    $("myOrdersList").textContent = "Please sign in first. Close this panel and use Sign In / Sign Up.";
    return;
  }
  await loadMyOrders();
});

$("myOrdersClose").addEventListener("click", () => {
  $("myOrdersOverlay").hidden = true;
});

$("myOrdersOverlay").addEventListener("click", event => {
  if (event.target === $("myOrdersOverlay")) $("myOrdersOverlay").hidden = true;
});

$("myProfileBtn").addEventListener("click", async () => {
  const { data: { user }, error } = await supabaseClient.auth.getUser();
  if (error || !user) {
    alert("Please sign in to view your profile.");
    return;
  }
  $("myProfileEmail").textContent = user.email || "";
  $("myProfileName").value = user.user_metadata?.full_name || "";
  $("profileMobile").value = user.user_metadata?.mobile || "";
$("profileAddress").value = user.user_metadata?.delivery_address || "";
  $("myProfileMessage").textContent = "";
  $("myProfileOverlay").hidden = false;
});

$("myProfileClose").addEventListener("click", () => {
  $("myProfileOverlay").hidden = true;
});

$("myProfileOverlay").addEventListener("click", event => {
  if (event.target === $("myProfileOverlay")) $("myProfileOverlay").hidden = true;
});


$("myProfileSave").addEventListener("click", async () => {
  const name = $("myProfileName").value.trim();
  const mobile = $("profileMobile").value.trim();
  const address = $("profileAddress").value.trim();
  const message = $("myProfileMessage");

  if (!name) {
    message.textContent = "Please enter your name.";
    return;
  }

  if (!mobile || !address) {
    message.textContent = "Please enter mobile number and delivery address.";
    return;
  }

  message.textContent = "Saving...";

  const { error } = await supabaseClient.auth.updateUser({
    data: {
      full_name: name,
      mobile: mobile,
      delivery_address: address
    }
  });

  if (error) {
    message.textContent = "Could not save profile: " + error.message;
    return;
  }

  message.textContent = "Profile updated successfully.";
});
