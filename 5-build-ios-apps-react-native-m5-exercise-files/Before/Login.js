'use strict';

var React = require('react-native');
var buffer = require('buffer');

var {
    Text,
    View,
    Image,
    TextInput,
    TouchableHighlight,
    Component,
    ActivityIndicatorIOS
} = React;

class Login extends Component {
    constructor(props){
        super(props);

        this.state = {
            showProgress: false
        }
    }

    render(){
        var errorCtrl = <View />;

        if(!this.state.success && this.state.badCredentials){
            errorCtrl = <Text style={styles.error}>
                That username and password combination did not work
            </Text>;
        }

        if(!this.state.success && this.state.unknownError){
            errorCtrl = <Text style={styles.error}>
                We experienced an unexpected issue
            </Text>;
        }

        return (
            <View style={styles.container}>
                <Image style={styles.logo} source={require('image!Octocat')} />
                <Text style={styles.heading}>Github browser</Text>
                <TextInput
                    onChangeText={(text)=> this.setState({username: text})}
                    style={styles.loginInput}
                    placeholder="Github username"></TextInput>
                <TextInput
                    onChangeText={(text)=> this.setState({password: text})}
                    style={styles.loginInput}
                    placeholder="Github password" secureTextEntry="true"></TextInput>
                <TouchableHighlight
                    onPress={this.onLoginPressed.bind(this)}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Log in</Text>
                </TouchableHighlight>

                {errorCtrl}

                <ActivityIndicatorIOS
                    animating={this.state.showProgress}
                    size="large"
                    style={styles.loader}
                    />
            </View>


        );
    }

    onLoginPressed(){
        console.log('Attempting to log in with username ' + this.state.username);
        this.setState({showProgress: true});

        var authService = require('./AuthService');
        authService.login({
            username: this.state.username,
            password: this.state.password
        }, (results)=> {
            this.setState(Object.assign({
                showProgress: false
            }, results));

            if(results.success && this.props.onLogin){
                this.props.onLogin();
            }
        });
    }
}

var styles = React.StyleSheet.create({
    container: {
        backgroundColor: '#F5FCFF',
        paddingTop: 40,
        padding: 10,
        alignItems: 'center',
        flex: 1
    },
    logo: {
        width: 66,
        height:55
    },
    heading: {
        fontSize: 30,
        margin: 10,
        marginBottom: 20
    },
    loginInput: {
        height: 50,
        marginTop: 10,
        padding: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48BBEC',
        borderRadius: 0,
        color: '#48BBEC'
    },
    button: {
        height: 50,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        alignSelf: 'stretch',
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    buttonText: {
        color: '#fff',
        fontSize: 24
    },
    loader: {
        marginTop: 20
    },
    error: {
        color: 'red',
        paddingTop: 10
    }
});

module.exports = Login;