<?php
// gestion des alternants
/*=============================================================
gestion des droits
-1=non authentifié;   1=authentifié CAS mais inconnu   2=secretaire lecture
4=enseignant(modif sa progression)  6=chef de parcours ou edt  8=grand chef 10=administrateur
=========================================================*/

session_start();

if(isset($_GET["la_bdd"]))
{
	$_SESSION["la_base"]=$_GET["la_bdd"];
}

if(isset($_POST["selectionbdd"]))
	{
		$_SESSION["la_base"]=$_POST["la_bdd"];
	}

	
	include_once("session.php");
	

	

	if(isset($_GET["menu"]))
	{
		$menu=$_GET["menu"];
	}
	else
	{
		$menu=0;
	}
	
	if(isset($_GET["sous_menu"]))
			$sous_menu=$_GET["sous_menu"];
	else
			$sous_menu=0;
	
	


	
	
	
	if(isset($_POST["aff_menu"]))
	{
		$aff_menu=$_POST["aff_menu"];
		$_SESSION["aff_menu"]=$aff_menu;
		
	}
	else
	{
		$aff_menu=$_SESSION["aff_menu"];
	}
	
	
	if($aff_menu=="reduit")
	{
		$checked1="checked";
		$checked2="";
		$aff_menu=array(1,1,1,1,0,0,0,0,0);
		if($aff_menu[$menu]==0) $menu=0;
	}
	else
	{
		$aff_menu=array(1,1,1,1,1,1,1,1,1);
		$checked2="checked";
		$checked1="";
		
	}
	
	

	

	
	$liste_menu=array("Mes Alternants","Les Alternants","Les Entreprises","Soutenance","Les référents","Les formations","Import-Export","La base");	
	$liste_ss_menu=array();
	$liste_ss_menu[]=array("Généralités","prise de RDV","notation","documents");
	$liste_ss_menu[]=array("Edition","Cartographie","Leurs Notes","Leur référent");
	$liste_ss_menu[]=array("Entreprises","Tuteurs");
	$liste_ss_menu[]=array("session examen","planification","les soutenances","envoi mail");
	$liste_ss_menu[]=array("Edition");
	$liste_ss_menu[]=array("Edition","Evaluation");
	$liste_ss_menu[]=array("Import CSV","Export CSV");
	$liste_ss_menu[]=array("voir");
	
	
	
	

?>	

	

<!doctype html>
<html>

<head>
<meta name="description" content="gestion des alternants" />
<meta name="author" content="Christophe Varin" />
<meta charset="utf-8" />
<title>Gestion des alternants </title>
<link rel="icon" href="images/edt.png" />

	
	
		<link rel="stylesheet" href="style.css">
<?php	echo '<link rel="stylesheet" href="contenu/style'.$menu.'.css"/>'; ?>

		<script src="javascript/fonctions.js"></script>
<?php	echo '<script src="javascript/fonctions'.$menu.'.js"></script>'; ?>

	
	


</head>
<body >

<section id="ensemble">

<header id="entete">
<?php

	echo '<span class="annee">'.$_SESSION["la_base"].' </span>';  

	echo '<h3>'.$liste_menu[$menu]." => ".$liste_ss_menu[$menu][$sous_menu].'</h3>';
	echo '<span class="logout"><form  OnClick="submit" id="formulaire" action="index.php?menu='.$menu.'" method="post" >';
	echo '<label>menu<label> <input  onchange="this.form.submit();" id="ir" type="radio" '.$checked1.' name="aff_menu" value="reduit"><label for="ir" >Reduit</label>
		<input  id="ic" onchange="this.form.submit();"  type="radio" name="aff_menu" '.$checked2.'  value="complet"><label for="ic">Complet </label><a  href="index.php?logout=1"> '.$_SESSION["login"].":logout</a>";
	echo '</form></span>';
	
	

	?>
	
</header>
<nav id="menuH1">
<?php
	$maxi=count($liste_menu);
	echo "<ul id='menu'>";		
	for($m=0;$m<$maxi;$m++)
	{
		if ($aff_menu[$m]==1)
		{
			if($m==$menu)
				echo '<li class="encours"><a  href="index.php?menu='.$m.'">'.$liste_menu[$m].'</a>';
			else
				echo '<li><a  href="index.php?menu='.$m.'">'.$liste_menu[$m].'</a>';
				
		
		
			echo"<ul>";
			for($i=0;$i<count($liste_ss_menu[$m]);$i++)
			{
				if (($i==$sous_menu)&&($m==$menu))
					echo '<li class="encours"><a  href="index.php?menu='.$m.'&sous_menu='.$i.'">'.$liste_ss_menu[$m][$i].'</a></li>'; 
				else
					echo '<li><a  href="index.php?menu='.$m.'&sous_menu='.$i.'">'.$liste_ss_menu[$m][$i].'</a></li>';
			}
			echo"</ul></li>";
		}
	}
	echo "</ul>";
	echo"<ul id='sousmenu'>";
		for($i=0;$i<count($liste_ss_menu[$menu]);$i++)
		{
			if ($i==$sous_menu)
				echo '<li class="encours"><a  href="index.php?menu='.$menu.'&sous_menu='.$i.'">'.$liste_ss_menu[$menu][$i].'</a></li>'; 
			else
				echo '<li><a  href="index.php?menu='.$menu.'&sous_menu='.$i.'">'.$liste_ss_menu[$menu][$i].'</a></li>';
		}
		echo"</ul>";


?>


</nav>






<section id="contenu">
<?php




	
    
	
		
		
		
		try
		{
			
			$bdd = new PDO('mysql:host=localhost;dbname='.$_SESSION["la_base"],'root','');
			
			$bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			
			
			$result=$bdd->exec("SET CHARACTER SET utf8");
			
			//lecture coordonnée IUT
			if(!isset($_SESSION["longitude_iut"]))
			{
				 $requete="SELECT longitude,latitude FROM iut"; 
				 $result=$bdd->query($requete);
				 if($result==false)
				 {
					echo "<p>echec requete : $requete</p>";
				 }
				 else
				 {
					$ligne = $result->fetch();
					$_SESSION["longitude_iut"]=$ligne["longitude"];
					$_SESSION["latitude_iut"]=$ligne["latitude"];
					$result->closeCursor();	
				 }

			}	
			
			include_once("contenu/contenu$menu$sous_menu.php");
			//echo "<p>contenu/contenu$menu$sous_menu.php</p>";
	
			
			$bdd=null;//fermer la connexion
			
		}
		catch (Exception $e)
		{
				echo"<h3>Echec  ".$e->getMessage()."</h3>";
				
		}
	
 
 
?>

</section>

<footer id="pied">

<img src="images/logounrt.png">

<p>

<?php


echo "<a href='mailto:christophe.varin@univ-nantes.fr?subject=Bug logiciel EDT &body=Signalé par user' title='mail en cas de bug'>Design By Christophe Varin</a><br/>";

  $d=date('D d M Y H:i');
echo "<span >$d</span>";
?>

</p>


<p><span>version  du 16-05-2022<br/>Page <?php echo "$menu.$sous_menu";?> </span>
</p>
</footer>
</section>

</body>
</html>


