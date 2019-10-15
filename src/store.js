export default {
    "nominated_restaurants": [
        {
            "id": "1",
            "name": "Burger Blam!",
            "date_nominated": "2019-01-01",
            "food_category": "Burgers",
            "nominated_by_user": "1",
            "likes_table": "1",
        },
        {
            "id": "2",
            "name": "Sally's Burgers",
            "date_nominated": "2019-02-02",
            "food_category": "Burgers",
            "nominated_by_user": "1",
            "likes_table": "2",
        },
        {
            "id": "3",
            "name": "Downtown Deli & Grill",
            "date_nominated": "2019-03-03",
            "food_category": "Burgers",
            "nominated_by_user": "2",
            "likes_table": "3",
        },
    ],
    "users": [
        {
            "id": "1",
            "username": "charlie_pdx",
        },
        {
            "id": "2",
            "username": "jane_doh!",
        },
        {
            "id": "3",
            "username": "simons_say",
        },
        {
            "id": "4",
            "username": "salsa_champion12",
        },
    ],
    "likes_and_comments": [
        {
            "id": "1",
            "rest_id": "1",
            "liked_by": [
                {
                    "user": "1",
                    "date_liked": "2019-08-08",
                    "comment": "Yes! This is the best burger"
                },
                {
                    "user": "2",
                    "date_liked": "2019-09-09",
                    "comment": "I came here hoping to see this on the list!"
                },
                {
                    "user": "3",
                    "date_liked": "2019-10-08",
                    "comment": "I like the bleu cheese burger"
                },
                {
                    "user": "4",
                    "date_liked": "2019-7-29",
                    "comment": "Grilled onions are the bomb!"
                },
            ]
        },
        {
            "id": "2",
            "rest_id": "2",
            "liked_by": [
                {
                    "user": "1",
                    "date_liked": "2019-08-08",
                    "comment": "Scrumptious burger, the pickles are bombastic"
                },
                {
                    "user": "2",
                    "date_liked": "2019-09-09",
                    "comment": "I come here every Saturday for the Burger Special"
                },
            ]
        },
        {
            "id": "3",
            "rest_id": "3",
            "liked_by": [
                {
                    "user": "3",
                    "date_liked": "2019-08-08",
                    "comment": "Whatever is in the sauce is amazing"
                },
                {
                    "user": "4",
                    "date_liked": "2019-09-09",
                    "comment": "By far my favorite burger in PDX!!"
                },
            ]
        },
    ]
}