<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kizöldítjük a Földet</title>
    <!-- BOOTSTRAP - Latest compiled and minified CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- BOOTSTRAP - Latest compiled JavaScript -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    <link rel="stylesheet" type="text/css" media="screen" href="\..\kizolditjukafoldet\css\kaf.css" />
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <script src='https://code.jquery.com/jquery-3.6.0.min.js'></script>
    <script src="kizolditjukafoldet\js\Ajax.js"></script>
    <script src="kizolditjukafoldet\js\Bejegyzes.js"></script>
    <script src="kizolditjukafoldet\js\Chart.js"></script>
    <script src="kizolditjukafoldet\js\Main.js"></script>
    <meta name="csrf-token" content=<?php $token = csrf_token();
                                    echo $token; ?>>

</head>

<body>

<!-- nav -->
    
<nav class="navbar navbar-expand-sm navbar-light bg-success">
	  <div class="container-fluid ">
		<a class="navbar-brand " href="#">Menü</a>
		<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
		  <span class="navbar-toggler-icon"></span>
		</button>
		<div class="collapse navbar-collapse " id="navbarSupportedContent">
		  <ul class="navbar-nav ms-auto">
			<li class="nav-item">
			  <a class="nav-link active" aria-current="page" href="#">Bejelentkezés</a>
			</li>
			<li class="nav-item">
			  <a class="nav-link" href="#">Regisztráció</a>
			</li>			
		  </ul>		  
		</div>
	  </div>
	</nav>

    <!-- header -->

    <header>
        <h1>Kizöldítjük a Földet</h1>
    </header>

   

    <article>    

    <!-- form -->
        <form method="POST" enctype="multipart/form-data">
            <fieldset>
                <legend>Mit tettél ma a Földért?</legend>

                <div id="formfejlec">
                    <div>                       
                        <select name="osztalyok" id="osztalyok">
                            <option value="0">--Válassz osztályt--</option>
                        </select>
                    </div>

                    <div>                      
                        <select name="tevekenysegek" id="tevekenysegek">
                            <option value="0">--Válassz tevékenységet--</option>
                        </select>
                    </div>

                    <div>
                        <input type="button" id="kuld" name="kuld" value="Küld" >
                    </div>
                </div>
            </fieldset>
        </form>

        <!-- chart -->

        <div id="chart_div"></div>

       <!-- kereses mezo -->
        <input class="form-control" id="kereses" type="text" placeholder="Keresés..">

        <!-- szures -->
        <div>                       
         <select name="szures-osztalyra" id="szures-osztalyra">
                            <option value="0">--Válassz osztályt--</option>
             </select>
         </div>

          <!-- tablazat -->
    
        <table class="table table-bordered table-striped table-success">
            <thead>
                <tr>
                 <th id='osztalyId'>Osztály</th>
                    <th id='tevekenyseg.nev'>Tevékenység</th>                    
                    <th id='tevekenyseg.pontszam' >Pont</th>
                    <th id='allapot' >Státusz</th>
                </tr>
            </thead>
            <tbody id="bejegyzes-lista">            
                
            </tbody>
        </table>

    </article>

</body>

</html>