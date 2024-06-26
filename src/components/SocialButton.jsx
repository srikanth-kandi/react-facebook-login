import { Component } from "react";
import SocialLogin from "react-social-login";

class SocialButton extends Component {
    render() {
        const {children, triggerLogin, triggerLogout, ...props} = this.props;
        return (
            <button onClick={triggerLogin} {...props}>
                {children}
            </button>
        )
    }
}

export default SocialLogin(SocialButton);
