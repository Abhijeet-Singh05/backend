# Wireframes — Low Fidelity

Below are simple ASCII wireframes to show layout and content priorities. Use these as a starting point for high-fidelity mocks.

## Mobile — Home Feed

-------------------------------------------------
| Header (logo)     | search | profile icon     |
-------------------------------------------------
| Post composer (text + upload btn)             |
-------------------------------------------------
| Post / Video card (thumbnail, title, actions) |
| - media                                       |
| - title / user                                |
| - actions: like comment subscribe             |
-------------------------------------------------
| Bottom nav: Home Search Upload Activity Me    |
-------------------------------------------------

## Desktop — Home Feed

----------------------------------------+---------------------+----------------
| Left rail (nav)                       | Main content        | Right rail      
| - Home                                | - Feed              | - Suggestions    
| - Subscriptions                       | - Post / Video card | - Trending       
----------------------------------------+---------------------+----------------

## Video Detail (mobile)

-------------------------------------
| Header                              
-------------------------------------
| Video player (top)                  
| Title / user                        
| Like / Comment / Share / Subscribe  
| Comments (scrollable panel)         
-------------------------------------

## Profile

---------------------------------
| Profile header (avatar, follow)  
| Tabs: Posts / Videos / Playlists  
| Grid/List of media               
---------------------------------

## Upload (mobile / desktop)

---------------------------------
| Drag & drop area / browse btn   
| Preview thumbnail / video       
| Title                          
| Description                    
| Playlist select / visibility   
| Submit (upload)                
---------------------------------

## Component mapping
- `Header`, `BottomNav`/`LeftRail`
- `PostCard`, `VideoCard`, `Player`
- `Composer`, `UploadForm`
- `ProfileHeader`, `MediaGrid`
