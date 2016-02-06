import React from 'react';
import Relay from 'react-relay';

import RaisedButton from 'material-ui/lib/raised-button';
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';
import Checkbox from 'material-ui/lib/checkbox';
import MenuItem from 'material-ui/lib/menus/menu-item';
import SelectField from 'material-ui/lib/select-field';
import TextField from 'material-ui/lib/text-field';

import Compendium_updateMutation from '../mutations/Compendium_updateMutation';

class Compendium extends React.Component
{
  constructor( props )
  {
    super( props );

    const node = this.props.Viewer.compendiums.edges[ 0 ].node;

    this.state = {
      Compendium_RangedNumber_error:    "",
      Compendium_Excitement:            node.Compendium_Excitement,
      Compendium_FavoriteMammal:        node.Compendium_FavoriteMammal,
      Compendium_LikedSunset_Ocean:     node.Compendium_LikedSunset_Ocean,
      Compendium_LikedSunset_Lake:      node.Compendium_LikedSunset_Lake,
      Compendium_LikedSunset_Mountains: node.Compendium_LikedSunset_Mountains,
      Compendium_LikedSunset_Plains:    node.Compendium_LikedSunset_Plains,
      Compendium_LikedSunset_Purple:    node.Compendium_LikedSunset_Purple,
      Compendium_LikedSunset_Green:     node.Compendium_LikedSunset_Green,
      Compendium_LikedSunset_Other:     node.Compendium_LikedSunset_Other,
    };
  }

  componentDidMount( )
  {
    // Call all validation methods here
    this._Compendium_RangedNumberChange( );
  }

  _handleUpdate( Compendium )
  {
    Relay.Store.commitUpdate(
      new Compendium_updateMutation( {
        Compendium:                         Compendium,
        Compendium_FirstTextInput:          this.refs.Compendium_FirstTextInput.getValue( ),
        Compendium_RangedNumber:            parseInt( this.refs.Compendium_RangedNumber.getValue( ), 10 ),
        Compendium_Excitement:              this.state.Compendium_Excitement,
        Compendium_FollowUpQuestion:        this.refs.Compendium_FollowUpQuestion.getValue( ),
        Compendium_FavoriteMammal:          this.state.Compendium_FavoriteMammal,
        Compendium_FavoriteMammalOtherText: this.refs.Compendium_FavoriteMammalOtherText.getValue( ),
        Compendium_LastText:                this.refs.Compendium_LastText.getValue( ),
        Compendium_LikedSunset_Ocean:       this.state.Compendium_LikedSunset_Ocean,
        Compendium_LikedSunset_Lake:        this.state.Compendium_LikedSunset_Lake,
        Compendium_LikedSunset_Mountains:   this.state.Compendium_LikedSunset_Mountains,
        Compendium_LikedSunset_Plains:      this.state.Compendium_LikedSunset_Plains,
        Compendium_LikedSunset_Purple:      this.state.Compendium_LikedSunset_Purple,
        Compendium_LikedSunset_Green:       this.state.Compendium_LikedSunset_Green,
        Compendium_LikedSunset_Other:       this.state.Compendium_LikedSunset_Other,
        Compendium_LikedSunset_OtherText:   this.refs.Compendium_LikedSunset_OtherText.getValue( ),
      } )
    );
  }

  _Compendium_RangedNumberChange( )
  {
    const value = this.refs.Compendium_RangedNumber.getValue( );
    const valueInt = parseInt( value, 10 );

    let errorText = "Enter a number between 18 and 65";

    if( value == valueInt )
      if( valueInt >= 18 && valueInt <= 65 )
        errorText = "";

    this.setState( {
      Compendium_RangedNumber_error: errorText
    } );
  }

  _Compendium_ExcitementChange( event, index, value )
  {
    this.setState( {
      Compendium_Excitement: value
    } );
  }

  _Compendium_FavoriteMammalChange( event, index, value )
  {
    this.setState( {
      Compendium_FavoriteMammal: value
    } );
  }

  _Compendium_LikedSunset_OceanChange( event, value )
  {
    this.setState( {
      Compendium_LikedSunset_Ocean: value
    } );
  }

  _Compendium_LikedSunset_LakeChange( event, value )
  {
    this.setState( {
      Compendium_LikedSunset_Lake: value
    } );
  }
  _Compendium_LikedSunset_MountainsChange( event, value )
  {
    this.setState( {
      Compendium_LikedSunset_Mountains: value
    } );
  }
  _Compendium_LikedSunset_PlainsChange( event, value )
  {
    this.setState( {
      Compendium_LikedSunset_Plains: value
    } );
  }
  _Compendium_LikedSunset_PurpleChange( event, value )
  {
    this.setState( {
      Compendium_LikedSunset_Purple: value
    } );
  }
  _Compendium_LikedSunset_GreenChange( event, value )
  {
    this.setState( {
      Compendium_LikedSunset_Green: value
    } );
  }
  _Compendium_LikedSunset_OtherChange( event, value )
  {
    this.setState( {
      Compendium_LikedSunset_Other: value
    } );
  }

  render( )
  {
    // Determine error text, since we already have the errors in state
    let formErrorText = "";
    if(
      this.state.Compendium_RangedNumber_error != ""
    )
      formErrorText = "There are errors";

    const edge = this.props.Viewer.compendiums.edges[ 0 ];

    return (
      <Card key={ edge.node.id }>
        <CardHeader
          title="User Compendium"
          subtitle="One to one properties for a user retrieved from an edge"
        />
        <CardText>
          <TextField
            ref="Compendium_FirstTextInput"
            defaultValue={ edge.node.Compendium_FirstTextInput }
            floatingLabelText="When we do a Haiku"
            fullWidth={ true }
          />
          <TextField
            ref="Compendium_RangedNumber"
            defaultValue={ edge.node.Compendium_RangedNumber }
            floatingLabelText="A number between eighteen and sixty"
            fullWidth={ true }
            errorText={ this.state.Compendium_RangedNumber_error }
            onChange={ this._Compendium_RangedNumberChange.bind( this ) }
          />
          <SelectField
            value={ this.state.Compendium_FavoriteMammal }
            floatingLabelText="Which one is your favorite water mammal?"
            onChange={ this._Compendium_FavoriteMammalChange.bind( this ) }
            fullWidth={ true }
          >
            <MenuItem value={1} primaryText="Dolphin"/>
            <MenuItem value={2} primaryText="Whale"/>
            <MenuItem value={3} primaryText="Manatee"/>
            <MenuItem value={4} primaryText="Other"/>
          </SelectField>
          <TextField
            ref="Compendium_FavoriteMammalOtherText"
            defaultValue={ edge.node.Compendium_FavoriteMammalOtherText }
            fullWidth={ true }
          />
          <TextField
            ref="Compendium_FollowUpQuestion"
            defaultValue={ edge.node.Compendium_FollowUpQuestion }
            floatingLabelText="The middle has"
            fullWidth={ true }
          />
          <SelectField
            value={ this.state.Compendium_Excitement }
            floatingLabelText="How excited are you about Relay?"
            onChange={ this._Compendium_ExcitementChange.bind( this ) }
            fullWidth={ true }
          >
            <MenuItem value={1} primaryText="Ambivalent, just meh" label="Ambivalent"/>
            <MenuItem value={2} primaryText="Cautious, been burnt before" label="Cautious"/>
            <MenuItem value={3} primaryText="Optimistic, Facebook made it!" label="Optimistic"/>
            <MenuItem value={4} primaryText="Excited, I can do so much with it" label="Excited"/>
            <MenuItem value={5} primaryText="Enthusiastic, great productivity" label="Enthusiastic"/>
            <MenuItem value={6} primaryText="Ecstatic, death to REST!" label="Ecstatic"/>
            <MenuItem value={7} primaryText="Riled Up, can't wait for 1.0" label="Riled Up"/>
            <MenuItem value={8} primaryText="Mind = Blown, I will become a contributor" label="Mind = Blown"/>
          </SelectField>
          <TextField
            ref="Compendium_LastText"
            defaultValue={ edge.node.Compendium_LastText }
            floatingLabelText="More than both the beginning and the end"
            fullWidth={ true }
          />
          <div>
            What kind of sunsets do you like?
          </div>
          <Checkbox
            label="Over the ocean"
            defaultChecked={ this.state.Compendium_LikedSunset_Ocean }
            onCheck={ this._Compendium_LikedSunset_OceanChange.bind( this ) }
          />
          <Checkbox
            label="Over a lake"
            defaultChecked={ this.state.Compendium_LikedSunset_Lake }
            onCheck={ this._Compendium_LikedSunset_LakeChange.bind( this ) }
          />
          <Checkbox
            label="From a mountain top"
            defaultChecked={ this.state.Compendium_LikedSunset_Mountains }
            onCheck={ this._Compendium_LikedSunset_MountainsChange.bind( this ) }
          />
          <Checkbox
            label="Over plains"
            defaultChecked={ this.state.Compendium_LikedSunset_Plains }
            onCheck={ this._Compendium_LikedSunset_PlainsChange.bind( this ) }
          />
          <Checkbox
            label="Purple"
            defaultChecked={ this.state.Compendium_LikedSunset_Purple }
            onCheck={ this._Compendium_LikedSunset_PurpleChange.bind( this ) }
          />
          <Checkbox
            label="Green"
            defaultChecked={ this.state.Compendium_LikedSunset_Green }
            onCheck={ this._Compendium_LikedSunset_GreenChange.bind( this ) }
          />
          <Checkbox
            label="Other"
            defaultChecked={ this.state.Compendium_LikedSunset_Other }
            onCheck={ this._Compendium_LikedSunset_OtherChange.bind( this ) }
          />
          <TextField
            ref="Compendium_LikedSunset_OtherText"
            defaultValue={ edge.node.Compendium_LikedSunset_OtherText }
            fullWidth={ true }
          />
          <div>
            <RaisedButton
              label="Update"
              secondary={true}
              disabled={ formErrorText != "" }
              onTouchTap={ ( ) => this._handleUpdate( edge.node ) }
            />
          </div>
        </CardText>
      </Card>
    );
  }
}

export default Relay.createContainer( Compendium, {
  fragments: {
    Viewer: ( ) => Relay.QL`
      fragment on Viewer {
        compendiums( first: 1 ){
          edges {
            node {
              id,
              Compendium_FirstTextInput,
              Compendium_RangedNumber,
              Compendium_Excitement,
              Compendium_FollowUpQuestion,
              Compendium_FavoriteMammal,
              Compendium_FavoriteMammalOtherText,
              Compendium_LastText,
              Compendium_LikedSunset_Ocean,
              Compendium_LikedSunset_Lake,
              Compendium_LikedSunset_Mountains,
              Compendium_LikedSunset_Plains,
              Compendium_LikedSunset_Purple,
              Compendium_LikedSunset_Green,
              Compendium_LikedSunset_Other,
              Compendium_LikedSunset_OtherText,
              ${Compendium_updateMutation.getFragment('Compendium')},
            },
          },
        },
      }
    `,
  },
});
