const quotes = [
    {
        quote: "인생에서 저지를 수 있는 가장 큰 실수는, 실수를 끊임없이 두려워하는 일이다",
        author: "엘버트 허버드",
    },
    {
        quote: "모든 인생은 실험이다. 더 많이 실험할수록 더 나아진다",
        author: "랄프 왈도 에머슨",
    },
    {
        quote: "자신감 있는 표정을 지어라. 자신감이 생긴다",
        author: "찰스 다윈",
    },
    {
        quote: "사람이 여행을 하는 이유는 도착하기 위해서가 아니라, 여행을 하기 위해서다",
        author: "괴테",
    },
    {
        quote: "고난의 시기에 동요하지 않는 것, 이것이 진정 칭찬받을 만한 뛰어난 인물의 증거다",
        author: "베토벤",
    },
    {
        quote: "당신이 할수 있다고 믿든 할수 없다고 믿든, 믿는 대로 될 것이다",
        author: "헨리 포드",
    },
    {
        quote: "인생을 다시 산다면, 다음에는 더 많은 실수를 저지르리라",
        author: "나딘 스테어",
    },
    {
        quote: "실패는 잊어라. 그러나 그것이 준 교훈은 절대 잊으면 안된다",
        author: "하버트 개서",
    },
];

const quote = document.querySelector("#quote p:first-child");
const author = document.querySelector("#quote span:last-child");

const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)];

quote.innerText = `'${todaysQuote.quote}'`;
author.innerText = todaysQuote.author;

