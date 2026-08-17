function toggleMenu(){document.getElementById("menu").classList.toggle("open")}

const teklifForm=document.getElementById("teklif-form");
if(teklifForm){
  teklifForm.addEventListener("submit",async function(e){
    e.preventDefault();

    const button=teklifForm.querySelector('button[type="submit"]');
    const status=document.getElementById("teklif-durum");
    const originalText=button.textContent;
    button.disabled=true;
    button.textContent="Gönderiliyor...";
    status.className="form-status";
    status.textContent="";

    const formData=new FormData(teklifForm);
    const payload={};
    formData.forEach((value,key)=>{payload[key]=value});

    try{
      const response=await fetch("https://formsubmit.co/ajax/info@goksoft.com.tr",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "Accept":"application/json"
        },
        body:JSON.stringify(payload)
      });

      if(!response.ok) throw new Error("Gönderim başarısız");
      const data=await response.json();
      if(data.success===false) throw new Error(data.message||"Gönderim başarısız");

      teklifForm.reset();
      status.className="form-status success";
      status.textContent="✓ Teklif talebiniz alındı. En kısa sürede sizinle iletişime geçeceğiz.";
    }catch(error){
      status.className="form-status error";
      status.textContent="Teklif gönderilemedi. Lütfen biraz sonra tekrar deneyin veya info@goksoft.com.tr adresinden bize ulaşın.";
    }finally{
      button.disabled=false;
      button.textContent=originalText;
    }
  });
}
