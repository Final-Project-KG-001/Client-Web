import React, { useEffect } from 'react';
import { useSubscription, gql, useQuery } from '@apollo/client';

const SUBSCRIBE_DENTAL_ADDED = gql`
    subscription onDentalAdded {
        newDental {
            _id
            appointmentId
            appointment {
                _id
            }
        }
    }
`;

const FETCH_DENTAL = gql`
    query FetchDental {
        dentals {
            _id
            appointmentId
            appointment {
                _id
            }
        }
    }
`;

const Tes = () => {
    const { error, loading, data, subscribeToMore } = useQuery(FETCH_DENTAL);
    // const { data, loading } =  useSubscription(SUBSCRIBE_DENTAL_ADDED);

    useEffect(() => {
        subscribeToMore({
            document: SUBSCRIBE_DENTAL_ADDED,
            updateQuery(prev, {subscriptionData}) {
                if(!subscriptionData.data) {
                    return prev;
                }

                const newDental = subscriptionData.data.newDental;
                console.log(prev);

                return {
                    ...prev,
                    dentals: [...prev.dentals, newDental]
                };
            }
        })
    }, [])

    console.log(error, loading, data);

    return (
        <div>
        </div>
    );
};

export default Tes;