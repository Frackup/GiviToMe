import { CommonActions } from '@react-navigation/native';

export default function ResetNavigation(navigation, initRoute, type) {
    
    if (initRoute === 'Home') {
        navigation.dispatch(
            CommonActions.reset({
                index: 1,
                routes: [{ 
                name: 'Home'
                },
                /*{ 
                    name: 'AddMoney'
                },
                { 
                    name: 'AddStuff'
                },
                { 
                    name: 'Settings'
                },
                { 
                    name: 'TypesList'
                },*/
            ]
            })
        );
    } else if (type === 'Money') {
        navigation.dispatch(
            CommonActions.reset({
                index: 1,
                routes: [{ 
                    name: 'LendList'
                },
                { 
                    name: 'AddMoney'
                },
                { 
                    name: 'ItemDetails'
                },
            ]
            })
        );
    } else {
        navigation.dispatch(
            CommonActions.reset({
                index: 1,
                routes: [{ 
                name: initRoute
                },
            ]
            })
        );
    }

}