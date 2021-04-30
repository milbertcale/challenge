function AccountWrapper(props){
    return <div className="account-wrapper">
        <div>
            {props.children}
        </div>    
    </div>
}

export default AccountWrapper;