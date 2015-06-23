'use strict';

var React = require('react-native');

var {
    Text,
    View,
    Component,
    ListView,
    ActivityIndicatorIOS,
    Image,
    TouchableHighlight
} = React;

var moment = require('moment');
var PushPayload = require('./PushPayload.js');

class Feed extends Component {
    constructor(props){
        super(props);

        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });

        this.state = {
            dataSource: ds,
            showProgress: true
        };
    }

    componentDidMount(){
        this.fetchFeed();
    }

    fetchFeed(){
        require('./AuthService').getAuthInfo((err, authInfo)=> {
            var url = 'https://api.github.com/users/'
                + authInfo.user.login
                + '/received_events';

            fetch(url, {
                headers: authInfo.header
            })
            .then((response)=> response.json())
            .then((responseData)=> {
                var feedItems =
                    responseData.filter((ev)=>
                        ev.type == 'PushEvent');
                this.setState({
                    dataSource: this.state.dataSource
                        .cloneWithRows(feedItems),
                    showProgress: false
                });
            })
        });
    }

    pressRow(rowData){
        this.props.navigator.push({
            title: 'Push Event',
            component: PushPayload,
            passProps: {
                pushEvent: rowData
            }
        });
    }

    renderRow(rowData){
        return (
            <TouchableHighlight
                onPress={()=> this.pressRow(rowData)}
                underlayColor='#ddd'
            >
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    padding: 20,
                    alignItems: 'center',
                    borderColor: '#D7D7D7',
                    borderBottomWidth: 1,
                    backgroundColor: '#fff'
                }}>
                    <Image
                        source={{uri: rowData.actor.avatar_url}}
                        style={{
                            height: 36,
                            width: 36,
                            borderRadius: 18
                        }}
                    />

                    <View style={{
                        paddingLeft: 20
                    }}>
                        <Text>
                            {moment(rowData.created_at).fromNow()}
                        </Text>
                        <Text>
                            <Text style={{
                                fontWeight: '600'
                            }}>{rowData.actor.login}</Text> pushed to
                        </Text>
                        <Text>
                            {rowData.payload.ref.replace('refs/heads/', '')}
                        </Text>
                        <Text>
                            at <Text style={{
                                fontWeight: '600'
                            }}>{rowData.repo.name}</Text>
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }

    render(){
      if(this.state.showProgress){
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center'
            }}>
                <ActivityIndicatorIOS
                    size="large"
                    animating={true} />
            </View>
        );
      }

      return (
        <View style={{
            flex: 1,
            justifyContent: 'flex-start'
        }}>
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow.bind(this)} />
        </View>
      );
    }
}

module.exports = Feed;