import React from 'react';
import {LanguageContext} from '../../Language/LangPack';
import HeadNavigation from '../../Components/HeadNavigation';
import OneUser from '../../Components/OneUser';
import DEVICE_STATUS from '../../Lib/DeviceStatus';

const MIN_LENGTH_TO_SEARCH = 2;

export default class GameStartUserPage extends React.Component {
    constructor(props) {
      super(props);
      this.state = { 
          searchList:[],
          recentList:[]
      };
      this.searchOnInput = this.searchOnInput.bind(this);
      this.onUserClick = this.onUserClick.bind(this);

      this.cancelButtonOnClick = this.cancelButtonOnClick.bind(this);
    }
    
    cancelButtonOnClick()
    {
        this.props.NavigationButtonCallBack(DEVICE_STATUS.GAME_SHOW_LIST);
    }

    searchOnInput(ev)
    {
        if ((ev.target.value || "").length < MIN_LENGTH_TO_SEARCH)
        {
            this.onUserListUpdate("MIN");
        }
        else
        {
            this.props.Device.GetUserList(ev.target.value, this.onUserListUpdate, this);
        }
    }

    onUserListUpdate(data)
    {
        if(data.UserList && Array.isArray(data.UserList))
        {
            let userList = [];
            for(var i in data.UserList)
            {
                if (data.UserList[i].NicName && data.UserList[i].Id) userList.push({Id:data.UserList[i].Id, Name : data.UserList[i].NicName});
            }
            this.setState({searchList:userList});
        }
        else
        {
            this.setState({searchList:[]});
        }
        
    }
    
    onUserClick(ev)
    {
        var postData = {};
        postData.CompetitorUserId = +ev.target.dataset.userid;
        postData.DeviceWorkToken = this.props.Device.DeviceWorkToken;
        postData.IsRandomCompetitor = false; 
        this.props.Device.CreateGame(this.onCreateGame, this, postData);
    }

    onCreateGame(newStatus, result)
    {
        console.log("onCreateGame");
        console.log(newStatus);
        console.log(result);
    }

    render() {
        
        const searchItems = this.state.searchList.map((u)=>
            <OneUser key={u.Id} userId={u.Id} Name={u.Name} onUserClickCallBack={this.onUserClick}/>
        );

        const recentItems = this.state.recentList.map((u)=>
            <OneUser key={u.Id} userId={u.Id} Name={u.Name} onUserClickCallBack={this.onUserClick} />
        );


		return (
			<LanguageContext.Consumer>
			{(context) =>
			( 
				<>
					<HeadNavigation>
						<button className="ButtonBack" onClick={this.cancelButtonOnClick}></button>

						<p className="HeadNavigationTitle">{context.GetText('finduser', 'labelWindow')}</p>
					</HeadNavigation>
					
					<div className="FindUser">
						<div className="Search">
							<input type="text" className="General" name="Search" onInput={this.searchOnInput} placeholder={context.GetText('finduser', 'inputPlaceholderSearch')} />
							<button disabled></button>
						</div>

						<p className="GeneralSubtitle">{context.GetText('finduser', 'sublabelFavoriteUsers')}</p>
						
						<ul className="Players">
                            {searchItems}
						</ul>

						<p className="GeneralSubtitle">{context.GetText('finduser', 'sublabelRecentUsers')}</p>
					
						<ul className="Players">
                            {recentItems}
						</ul>
					</div>
				</>
			)}
			</LanguageContext.Consumer>
		);
	}
}