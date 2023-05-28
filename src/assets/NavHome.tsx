function NavHome(props:{
  path: string
  isHoveredHome: boolean
  windowWidth: number
}) {
  return (
    <svg width="20" className="cursor-pointer" height="20" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8 0H1C.4 0 0 .4 0 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1V1c0-.6-.4-1-1-1Zm0 11H1c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1v-7c0-.6-.4-1-1-1ZM19 0h-7c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1V1c0-.6-.4-1-1-1Zm0 11h-7c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1v-7c0-.6-.4-1-1-1Z"
        fill={`${props.windowWidth >=1440 ?props.isHoveredHome ? 'Red' : props.path === '/home'? 'white':"#5A698F":props.path === '/home'? 'white':"#5A698F"}`}
      />
    </svg>
  );
}
export default NavHome;
