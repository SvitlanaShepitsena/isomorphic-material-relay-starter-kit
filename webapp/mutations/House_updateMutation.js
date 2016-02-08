import Relay from 'react-relay';

export default class House_updateMutation extends Relay.Mutation {
    static fragments = {
        House: () => Relay.QL`
      fragment on House {
        id,
      }
    `,
    };

    getMutation() {
    }

    getFatQuery() {
        return Relay.QL`
      fragment on House_updatePayload {
        House {
        }
      }
    `;
    }

    getConfigs() {
        return [{
            type: 'FIELDS_CHANGE',
            fieldIDs: {
                House: this.props.House.id,
            },
        }];
    }

    getVariables() {
        return {
            id: this.props.House.id,
            House_FirstTextInput: this.props.House_FirstTextInput
        };
    }

    getOptimisticResponse() {
        return {
            House: {
                id: this.props.House.id,
                House_FirstTextInput: this.props.House_FirstTextInput
            },
        };
    }
}
