let isNavigating = false;

export default function safeNavigate(navigateFn: ()=> void, delay: number= 450){
    if(isNavigating) return;

    isNavigating = true;
    navigateFn();

    setTimeout(()=>{
        isNavigating = false; //unlock after delay
    }, delay)
}